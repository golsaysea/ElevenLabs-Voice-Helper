// 1. 获取注入的插件 ID（content script 未提前插入节点时仍可通过 window.postMessage 中继）
;(() => {
  if (window.__elevenTokenInterceptorInstalled) return;
  window.__elevenTokenInterceptorInstalled = true;

  const getExtensionID = () => {
    const el = document.getElementById('elevenlabs');
    const raw = (el && (el.textContent || el.outerText)) || '';
    return String(raw).trim();
  };

  const sendBackground = (data) => {
    try {
      window.postMessage({ source: 'elevenlabs-token-helper-msg', payload: data }, '*');
    } catch (_) {}
    const extensionID = getExtensionID();
    if (extensionID && typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.sendMessage === 'function') {
      try {
        chrome.runtime.sendMessage(extensionID, data).catch(() => {});
      } catch (_) {}
    }
  };

  const emitToken = (rawToken) => {
    const token = String(rawToken || '').replace(/^Bearer\s+/i, '').trim();
    if (token.length > 20) {
      sendBackground({ action: 'token', token });
      sendBackground({ action: 'mark', text: '存' });
    }
  };

  const extractAuthHeader = (headers) => {
    if (!headers) return '';
    try {
      if (typeof Headers !== 'undefined' && headers instanceof Headers) {
        return headers.get('authorization') || headers.get('Authorization') || '';
      }
      if (Array.isArray(headers)) {
        const pair = headers.find((item) => Array.isArray(item) && String(item[0] || '').toLowerCase() === 'authorization');
        return pair ? String(pair[1] || '') : '';
      }
      if (typeof headers === 'object') {
        const authKey = Object.keys(headers).find((k) => k.toLowerCase() === 'authorization');
        return authKey ? String(headers[authKey] || '') : '';
      }
    } catch (_) {}
    return '';
  };

  sendBackground({ action: 'mark', text: '⏳' });

  // 2. 拦截原生 fetch（同时兼容 fetch(url, options) 和 fetch(new Request(...))）
  const originalFetch = window.fetch;
  if (typeof originalFetch === 'function') {
    window.fetch = async function patchedFetch(url, options) {
      let urlStr = '';
      try {
        urlStr = typeof url === 'string' ? url : (url && url.url ? String(url.url) : String(url || ''));
      } catch (_) {}

      if (urlStr.includes('elevenlabs.io')) {
        try {
          let tokenHeader = extractAuthHeader(options && options.headers);
          if (!tokenHeader && url && typeof url === 'object' && 'headers' in url) {
            tokenHeader = extractAuthHeader(url.headers);
          }
          if (tokenHeader) emitToken(tokenHeader);
        } catch (e) {
          console.warn('请求头解析失败', e);
        }
      }

      const response = await originalFetch.apply(this, arguments);

      // 【策略 B】：读取 Google Firebase / 鉴权接口返回的登录 token
      if (urlStr.includes('identitytoolkit.googleapis.com') || urlStr.includes('securetoken.googleapis.com')) {
        try {
          const clone = response.clone();
          const data = await clone.json();
          const token = data && (data.idToken || data.access_token || data.id_token);
          if (token) emitToken(token);
        } catch (_) {}
      }

      return response;
    };
  }

  // 3. 拦截 XMLHttpRequest Authorization 请求头（兼容上传/音频等 XHR 请求）
  if (typeof XMLHttpRequest !== 'undefined' && XMLHttpRequest.prototype) {
    const origOpen = XMLHttpRequest.prototype.open;
    const origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.open = function patchedOpen(method, url) {
      try {
        this.__elevenUrl = typeof url === 'string' ? url : String(url || '');
      } catch (_) {}
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.setRequestHeader = function patchedSetHeader(name, value) {
      try {
        if (
          String(name || '').toLowerCase() === 'authorization' &&
          (!this.__elevenUrl || this.__elevenUrl.includes('elevenlabs.io') || this.__elevenUrl.startsWith('/'))
        ) {
          emitToken(value);
        }
      } catch (_) {}
      return origSetHeader.apply(this, arguments);
    };
  }
})();
