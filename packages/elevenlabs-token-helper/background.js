// 1. 监听点击插件图标事件：弹出一个独立的大窗口
chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: chrome.runtime.getURL('popup.html'),
    type: 'popup',    // 这种类型会隐藏浏览器的地址栏和书签栏，看起来更像独立软件
    width: 1100,      // 界面宽度
    height: 800,      // 界面高度
    focused: true
  });
});

// 2. 接收网页登录授权 Token 并储存
chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
  if (!isTrustedElevenLabsSender(sender)) {
    sendResponse({ ok: false, error: 'invalid_sender' });
    return false;
  }

  const action = message.action;
  if (action === 'token') {
    chrome.storage.local.set({ token: message.token, lastCapturedTokenAt: Date.now() });
    sendResponse({ ok: true });
  } else if (action === 'mark') {
    chrome.action.setBadgeText({ text: message.text });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
    sendResponse({ ok: true });
  }
  return true;
});

function isTrustedElevenLabsSender(sender) {
  try {
    const url = new URL(sender?.url || '');
    return url.protocol === 'https:' && (url.hostname === 'elevenlabs.io' || url.hostname.endsWith('.elevenlabs.io'));
  } catch {
    return false;
  }
}
