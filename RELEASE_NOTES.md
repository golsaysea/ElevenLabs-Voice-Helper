# Release v3.5.3

## 新增与优化功能 (What's New)

- **🔑 彻底修复网页 Token 无法识别 / 过期失效导致无法生成的问题**：
  - **兼容 ElevenLabs 最新前端 `fetch(new Request(...))` 请求**：解决新版 ElevenLabs 网页端通过 `Request` 对象传参时原有拦截器漏抓 `Authorization: Bearer` 的问题，同时补全 `XMLHttpRequest` 请求头捕获。
  - **新增浏览器网络层 `chrome.webRequest` 实时监听**：扩展后台直接捕获所有发往 `*.elevenlabs.io` 的网页认证请求头，无需重新登录、无视 CSP 与页面刷新时机，且已打开的旧标签页也立即生效。
  - **主动读取 Firebase IndexedDB (`firebaseLocalStorageDb`) 与 `localStorage`**：打开插件或点击刷新时自动向已打开的 ElevenLabs 标签页提取未过期登录 Token，并在 Token 临近或超过 1 小时有效期 401 时自动热更新重试。
  - **新增侧边栏快捷操作**：新增 **`🔍 提取网页 Token`** 一键提取按钮与 **`📋 粘贴 Token`** 兜底手动输入框。
- **🚀 API 辅助版 (`v6.9.1`) 同步增强**：支持批量生成时遇到无积分账号自动秒切下一可用 Key，「🔁 同步音色」新增免费版 0 积分极速改名合并模式并默认安全保留原有音色。
