// 1. 监听点击插件图标事件：弹出一个独立的大窗口
chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: chrome.runtime.getURL('popup.html'),
    type: 'popup',
    width: 1100,
    height: 800,
    focused: true
  });
});

let lastSavedToken = '';
let lastSavedAt = 0;

function decodeJwtExpMs(token) {
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

function saveCapturedToken(rawToken) {
  const token = String(rawToken || '').replace(/^Bearer\s+/i, '').trim();
  if (token.length <= 20) return false;
  const expMs = decodeJwtExpMs(token);
  if (expMs && expMs <= Date.now() + 2000) return false;

  const now = Date.now();
  if (token !== lastSavedToken || now - lastSavedAt > 30000) {
    lastSavedToken = token;
    lastSavedAt = now;
    chrome.storage.local.set({ token, lastCapturedTokenAt: now });
  }
  chrome.action.setBadgeText({ text: '存' });
  chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
  return true;
}

function isTrustedElevenLabsSender(sender) {
  try {
    const url = new URL(sender?.url || '');
    return url.protocol === 'https:' && (url.hostname === 'elevenlabs.io' || url.hostname.endsWith('.elevenlabs.io'));
  } catch {
    return false;
  }
}

// 2. 在浏览器网络层直接观察发往 *.elevenlabs.io 的 Authorization Bearer 请求头
// 可无视 new Request(...)、Web Worker、CORS 与已打开页面未刷新等问题
function registerWebRequestSniffer() {
  if (!chrome.webRequest || !chrome.webRequest.onBeforeSendHeaders) return;
  const filter = {
    urls: [
      'https://elevenlabs.io/*',
      'https://*.elevenlabs.io/*'
    ]
  };
  const handler = (details) => {
    if (!details || !Array.isArray(details.requestHeaders)) return;
    if (details.initiator && details.initiator.startsWith('chrome-extension://')) return;
    const authHeader = details.requestHeaders.find(
      (h) => h && typeof h.name === 'string' && h.name.toLowerCase() === 'authorization' && typeof h.value === 'string' && h.value.toLowerCase().startsWith('bearer ')
    );
    if (authHeader && authHeader.value) {
      saveCapturedToken(authHeader.value);
    }
  };
  try {
    chrome.webRequest.onBeforeSendHeaders.addListener(handler, filter, ['requestHeaders', 'extraHeaders']);
  } catch (_) {
    try {
      chrome.webRequest.onBeforeSendHeaders.addListener(handler, filter, ['requestHeaders']);
    } catch (_) {}
  }
}
registerWebRequestSniffer();

// 3. 在所有已打开的 ElevenLabs 页面直接提取 IndexedDB/localStorage Token 并自动补挂拦截器
async function extractTokenFromOpenTabs() {
  let tabCount = 0;
  let captured = false;
  let expiredFound = false;
  let bestToken = '';

  try {
    const tabs = await chrome.tabs.query({
      url: ['https://elevenlabs.io/*', 'https://*.elevenlabs.io/*']
    });
    tabCount = Array.isArray(tabs) ? tabs.length : 0;
    for (const tab of (tabs || [])) {
      if (!tab || !Number.isInteger(tab.id)) continue;

      // 先尝试向已存在的 content script 查询；若页面早于插件刷新前打开，则主动 executeScript
      let res = null;
      try {
        res = await new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: 'scanPageToken' }, (reply) => {
            if (chrome.runtime.lastError) resolve(null);
            else resolve(reply || null);
          });
        });
      } catch (_) {}

      if (!res && chrome.scripting && typeof chrome.scripting.executeScript === 'function') {
        try {
          // 补注 MAIN world 拦截器到旧标签页
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['injectFetch.js'],
            world: 'MAIN'
          }).catch(() => {});

          const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async () => {
              const found = [];
              const parseExp = (tok) => {
                try {
                  const p = String(tok || '').split('.');
                  if (p.length < 2) return 0;
                  const b = p[1].replace(/-/g, '+').replace(/_/g, '/');
                  const j = JSON.parse(atob(b));
                  return Number(j && j.exp) ? Number(j.exp) * 1000 : 0;
                } catch (_) {
                  return 0;
                }
              };
              try {
                for (let i = 0; i < localStorage.length; i++) {
                  const k = localStorage.key(i);
                  if (!k || (!k.includes('firebase:authUser') && !k.includes('eleven'))) continue;
                  try {
                    const obj = JSON.parse(localStorage.getItem(k) || '{}');
                    const tok = obj?.stsTokenManager?.accessToken || obj?.accessToken || obj?.idToken;
                    if (typeof tok === 'string' && tok.length > 30) {
                      found.push({ token: tok, expMs: Number(obj?.stsTokenManager?.expirationTime) || parseExp(tok) });
                    }
                  } catch (_) {}
                }
              } catch (_) {}

              if (typeof indexedDB !== 'undefined') {
                let hasFirebaseDb = true;
                if (typeof indexedDB.databases === 'function') {
                  const dbs = await indexedDB.databases().catch(() => null);
                  if (Array.isArray(dbs)) {
                    hasFirebaseDb = dbs.some((d) => d && d.name === 'firebaseLocalStorageDb');
                  }
                }
                if (hasFirebaseDb) await new Promise((resolve) => {
                  let done = false;
                  const end = () => { if (!done) { done = true; resolve(); } };
                  const t = setTimeout(end, 1500);
                  try {
                    const req = indexedDB.open('firebaseLocalStorageDb');
                    req.onupgradeneeded = () => {
                      try { req.transaction && req.transaction.abort(); } catch (_) {}
                    };
                    req.onerror = () => { clearTimeout(t); end(); };
                    req.onsuccess = (ev) => {
                      const db = ev.target && ev.target.result;
                      if (!db || !db.objectStoreNames || !db.objectStoreNames.contains('firebaseLocalStorage')) {
                        try { db && db.close(); } catch (_) {}
                        clearTimeout(t);
                        return end();
                      }
                      try {
                        const tx = db.transaction('firebaseLocalStorage', 'readonly');
                        const getAllReq = tx.objectStore('firebaseLocalStorage').getAll();
                        getAllReq.onsuccess = () => {
                          for (const row of (Array.isArray(getAllReq.result) ? getAllReq.result : [])) {
                            const val = (row && row.value) || row;
                            const tok = val?.stsTokenManager?.accessToken || val?.accessToken || val?.idToken;
                            if (typeof tok === 'string' && tok.length > 30) {
                              found.push({ token: tok, expMs: Number(val?.stsTokenManager?.expirationTime) || parseExp(tok) });
                            }
                          }
                          try { db.close(); } catch (_) {}
                          clearTimeout(t);
                          end();
                        };
                        getAllReq.onerror = () => { try { db.close(); } catch (_) {} clearTimeout(t); end(); };
                      } catch (_) { try { db.close(); } catch (_) {} clearTimeout(t); end(); }
                    };
                  } catch (_) { clearTimeout(t); end(); }
                });
              }

              const now = Date.now();
              found.sort((a, b) => (b.expMs || 0) - (a.expMs || 0));
              const valid = found.find((x) => !x.expMs || x.expMs > now + 5000);
              if (valid) return { ok: true, token: valid.token, expired: false };
              return { ok: false, expired: found.some((x) => x.expMs && x.expMs <= now + 5000) };
            }
          });
          res = results && results[0] && results[0].result ? results[0].result : null;
        } catch (_) {}
      }

      if (res && res.ok && res.token) {
        if (saveCapturedToken(res.token)) {
          captured = true;
          bestToken = res.token;
          break;
        }
      } else if (res && res.expired) {
        expiredFound = true;
      }
    }
  } catch (_) {}

  return { ok: captured, token: bestToken, tabCount, expiredFound };
}

// 4. 接收来自内部 content script / popup 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== 'object') return false;
  if (message.action === 'extractTokenFromTabs') {
    extractTokenFromOpenTabs().then(sendResponse).catch(() => sendResponse({ ok: false, tabCount: 0 }));
    return true;
  }
  if (message.action === 'token') {
    const saved = saveCapturedToken(message.token);
    sendResponse({ ok: saved });
    return false;
  }
  if (message.action === 'mark') {
    chrome.action.setBadgeText({ text: String(message.text || '') });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
    sendResponse({ ok: true });
    return false;
  }
  return false;
});

// 5. 接收网页直接发来的授权 Token 并储存（兼容旧方式）
chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
  if (!isTrustedElevenLabsSender(sender)) {
    sendResponse({ ok: false, error: 'invalid_sender' });
    return false;
  }

  const action = message && message.action;
  if (action === 'token') {
    const saved = saveCapturedToken(message.token);
    sendResponse({ ok: saved });
  } else if (action === 'mark') {
    chrome.action.setBadgeText({ text: message.text });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
    sendResponse({ ok: true });
  }
  return true;
});
