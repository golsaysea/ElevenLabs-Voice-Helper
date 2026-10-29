// 1. 获取注入的插件 ID
const extensionID = document.getElementById('elevenlabs')?.outerText;
if (!extensionID) console.error("ElevenLabs 插件 ID 获取失败");

// 2. 后台通信封装
const sendBackground = data => {
  if (extensionID) chrome.runtime.sendMessage(extensionID, data).catch(() => {});
};

// 告诉后台拦截器已经准备就绪 (可选显示一个沙漏或不显示)
sendBackground({ action: 'mark', text: '⏳' }); 

// 3. 备份原生 fetch
const originalFetch = window.fetch;

// 4. 网页登录授权捕获逻辑
window.fetch = async (url, options) => {
  const urlStr = typeof url === 'string' ? url : (url?.url || '');

  // 【策略 A】：读取向 ElevenLabs 发送的 Authorization 请求头
  if (urlStr.includes('elevenlabs.io') && options?.headers) {
    try {
      let token = null;
      const h = options.headers;
      
      // 处理 Headers 对象
      if (h instanceof Headers) {
        token = h.get('authorization');
      } 
      // 处理普通 JSON 对象
      else {
        const authKey = Object.keys(h).find(k => k.toLowerCase() === 'authorization');
        if (authKey) token = h[authKey];
      }

      if (token) {
        token = token.replace(/Bearer /i, '').trim();
        // 简单验证 token 长度，防止抓到空值
        if (token.length > 20) {
          sendBackground({ action: 'token', token });
          sendBackground({ action: 'mark', text: '存' });
        }
      }
    } catch (e) {
      console.warn("请求头解析失败", e);
    }
  }

  // 正常放行请求，但我们要捕获它的 Response (返回值)
  const response = await originalFetch(url, options);

  // 【策略 B】：读取 Google Firebase / 鉴权接口返回的登录 token
  if (urlStr.includes('identitytoolkit.googleapis.com') || urlStr.includes('securetoken.googleapis.com')) {
    try {
      // 必须 clone 一份，否则网页本身的解析会报错
      const clone = response.clone();
      const data = await clone.json();
      
      // 从返回值中直接提取最新生成的 token
      const token = data.idToken || data.access_token;
      if (token) {
        sendBackground({ action: 'token', token });
        sendBackground({ action: 'mark', text: '存' });
      }
    } catch (e) {
      // 忽略非 JSON 响应的错误
    }
  }

  return response;
};
