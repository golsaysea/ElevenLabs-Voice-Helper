# ElevenLabs Voice Helper (ElevenLabs 辅助语音生成插件)

Chrome Manifest V3 扩展程序：支持 ElevenLabs 批量语音合成 (TTS)、多 API 负载均衡与自动故障切换、首句试听缓存 (`🔊 试听首句`)、标点短句智能时长估算、超 3 分钟文案自动拆分为 2 段 (`✂️ 超3分钟自动分2段`)、重名/误复制声音一键清理 (`🧹 清理声音`)，以及 AI 音效 / 免费 BGM 配乐降级生成 / 变声 / 人声提取 / 语音转文字工坊 (`🧰 其他工具`)。

## 包含版本 (Packages)

- `packages/elevenlabs-token-helper` — **网页 Token 自动识别捕获版** (`v3.3.0`)
- `packages/elevenlabs-api-helper` — **API 密钥批量辅助版** (`v6.6.0`)

## 核心功能亮点 (Key Features)

1. **🔊 首句极速试听 (`试听首句`)**
   - 自动提取每段文案的第一句话合成试听，内置内存缓存避免重复扣费，试听不触发下载或自动删除。
2. **⏱️ 智能时长估算与超 3 分钟自动分 2 段 (`✂️ 超3分钟自动分2段`)**
   - 综合中英文词数、数字、标点停顿及短句密度精准估算语音时长；超过 3 分钟的段落自动在段落/句末/转折词边界均分为 2 段。
3. **🧹 声音清理与重名去重管理 (`🧹 清理声音`)**
   - 自动检测同名重复声音，默认保留每组第 1 个并勾选多余副本；支持搜索、预览试听、一键从云端删除多余声音（释放声音槽位）或本地屏蔽隐藏，并在主界面下拉框自动合并同名声音。
4. **🧰 多合一 AI 音频工坊 (`🧰 其他工具`)**
   - 支持 **AI 音效生成** (`/v1/sound-generation`)、**AI 音乐生成**（默认免费 BGM 配乐降级模式，手动指定付费账号与模型时调用 `/v1/music` 并自动兼容回退 `music_v1`）、**语音变声** (`/v1/speech-to-speech`)、**人声提取降噪** (`/v1/audio-isolation`) 与 **语音转文字** (`/v1/speech-to-text`)。
   - 默认优先调度仅含系统声音且剩余额度充足的 API Key，自动保护自定义克隆声音专属额度。

## 安装方式 (Installation)

1. 从本仓库 [Releases](https://github.com/golsaysea/ElevenLabs-Voice-Helper/releases) 下载对应版本的 `.zip` 压缩包并解压到本地文件夹。
2. 打开 Chrome / Edge 浏览器扩展管理页面 `chrome://extensions/`，开启右上角 **开发者模式 (Developer mode)**。
3. 点击左上角 **加载已解压的扩展程序 (Load unpacked)**，选择解压后的文件夹即可使用。
