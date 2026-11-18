;(() => {
  if (window.__elevenExtBridgeInstalled) return;
  window.__elevenExtBridgeInstalled = true;

  // 1. 保留 DOM 中的插件 ID 节点（兼容原有外部发送通道）
  const element = document.createElement('div');
  element.textContent = chrome.runtime.id;
  element.id = 'elevenlabs';
  element.style.display = 'none';
  (document.documentElement || document.head || document).appendChild(element);

  // 2. 从 MAIN world 的 postMessage 安全中继 Token 到扩展后台（不受 CSP / DOM 移除影响）
  const forwardToBg = (data) => {
    if (!data || typeof data !== 'object') return;
    try {
      chrome.runtime.sendMessage(data, () => {
        void chrome.runtime.lastError;
      });
    } catch (_) {}
  };

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const msg = event.data;
    if (!msg || msg.source !== 'elevenlabs-token-helper-msg' || !msg.payload) return;
    forwardToBg(msg.payload);
  });

  // 3. 兜底注入 injectFetch.js（injectFetch.js 自身有去重守卫）
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injectFetch.js');
  (document.head || document.documentElement).appendChild(script);

  // 4. 主动读取同源 IndexedDB (firebaseLocalStorageDb) 中已登录的未过期 Token
  function decodeJwtExp(token) {
    try {
      const parts = String(token || '').split('.');
      if (parts.length < 2) return 0;
      const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = JSON.parse(atob(b64));
      return Number(json && json.exp) ? Number(json.exp) * 1000 : 0;
    } catch (_) {
      return 0;
    }
  }

  async function scanFirebaseIndexedDbToken() {
    const foundTokens = [];
    try {
      if (typeof localStorage !== 'undefined') {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k || (!k.includes('firebase:authUser') && !k.includes('eleven'))) continue;
          try {
            const raw = localStorage.getItem(k);
            if (!raw || raw[0] !== '{') continue;
            const obj = JSON.parse(raw);
            const tok = obj?.stsTokenManager?.accessToken || obj?.accessToken || obj?.idToken;
            if (typeof tok === 'string' && tok.length > 30) {
              const expMs = Number(obj?.stsTokenManager?.expirationTime) || decodeJwtExp(tok);
              foundTokens.push({ token: tok, expMs });
            }
          } catch (_) {}
        }
      }
    } catch (_) {}

    if (typeof indexedDB !== 'undefined') {
      try {
        let hasFirebaseDb = true;
        if (typeof indexedDB.databases === 'function') {
          const dbs = await indexedDB.databases().catch(() => null);
          if (Array.isArray(dbs)) {
            hasFirebaseDb = dbs.some((d) => d && d.name === 'firebaseLocalStorageDb');
          }
        }
        const dbTokens = !hasFirebaseDb ? [] : await new Promise((resolve) => {
          const collected = [];
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            resolve(collected);
          };
          const timer = setTimeout(finish, 1500);
          try {
            const req = indexedDB.open('firebaseLocalStorageDb');
            req.onupgradeneeded = () => {
              try { req.transaction && req.transaction.abort(); } catch (_) {}
            };
            req.onerror = () => { clearTimeout(timer); finish(); };
            req.onsuccess = (ev) => {
              const db = ev.target && ev.target.result;
              if (!db || !db.objectStoreNames || !db.objectStoreNames.contains('firebaseLocalStorage')) {
                try { db && db.close(); } catch (_) {}
                clearTimeout(timer);
                finish();
                return;
              }
              try {
                const tx = db.transaction('firebaseLocalStorage', 'readonly');
                const store = tx.objectStore('firebaseLocalStorage');
                const getAllReq = typeof store.getAll === 'function' ? store.getAll() : null;
                if (!getAllReq) {
                  try { db.close(); } catch (_) {}
                  clearTimeout(timer);
                  finish();
                  return;
                }
                getAllReq.onsuccess = () => {
                  const rows = Array.isArray(getAllReq.result) ? getAllReq.result : [];
                  for (const row of rows) {
                    const val = (row && row.value) || row;
                    const tok = val?.stsTokenManager?.accessToken || val?.accessToken || val?.idToken;
                    if (typeof tok === 'string' && tok.length > 30) {
                      const expMs = Number(val?.stsTokenManager?.expirationTime) || decodeJwtExp(tok);
                      collected.push({ token: tok, expMs });
                    }
                  }
                  try { db.close(); } catch (_) {}
                  clearTimeout(timer);
                  finish();
                };
                getAllReq.onerror = () => {
                  try { db.close(); } catch (_) {}
                  clearTimeout(timer);
                  finish();
                };
              } catch (_) {
                try { db.close(); } catch (_) {}
                clearTimeout(timer);
                finish();
              }
            };
          } catch (_) {
            clearTimeout(timer);
            finish();
          }
        });
        foundTokens.push(...dbTokens);
      } catch (_) {}
    }

    const now = Date.now();
    foundTokens.sort((a, b) => (b.expMs || 0) - (a.expMs || 0));
    const valid = foundTokens.find((item) => !item.expMs || item.expMs > now + 5000);
    if (valid && valid.token) {
      forwardToBg({ action: 'token', token: valid.token });
      forwardToBg({ action: 'mark', text: '存' });
      return { ok: true, token: valid.token, expired: false };
    }
    return {
      ok: false,
      expired: foundTokens.some((item) => item.expMs && item.expMs <= now + 5000)
    };
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.action === 'scanPageToken') {
      scanFirebaseIndexedDbToken().then(sendResponse).catch(() => sendResponse({ ok: false }));
      return true;
    }
    return false;
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(scanFirebaseIndexedDbToken, 300);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(scanFirebaseIndexedDbToken, 500);
    }, { once: true });
  }
})();
