# Release v3.5.2

## 新增与优化功能 (What's New)

- **🔁 新增跨 API 账号一键复制/同步音色 (`🔁 同步音色` · 完美兼容免费版账号)**：
  - 在主界面「选择声音」旁新增 **`🔁 同步音色`** 按钮与同步工坊弹窗，支持一键将指定音色同步到所有缺失该音色的 API 账号。
  - **三阶智能兼容引擎**：自动识别账号类型——对于**免费版 (Free Tier) API 账号**，自动调用免费号可用的官方 **Voice Design API (`/v1/text-to-voice/design` + `/v1/text-to-voice`)** 创建**一模一样名称**的自定义音色 (`category: "generated"`)；对于付费版账号，优先支持原声样本克隆 (`/v1/voices/add`) 或共享库添加；当免费账号满 3 个自定义音色槽位时，还支持自动替换 1 个旧自定义音色槽位。
  - **负载均衡无缝联动**：所有 API 账号同步生成同名音色后，负载均衡池自动将它们合并为同一个声音家族并跨账号并发合成。
- **🏷️ 新增批量开头标签输入框与一键操作栏 (`🏷️ 开头标签` / `➕ 批量加到开头`)**：支持在文案列表上方直接输入或选择预设指令标签（如 `[Sing everything in a powerful, raspy, soulful female Gospel style with emotional vibrato and sustained notes. No speaking, singing only.]` 等），一键批量加到所有文案最开头、一键清除开头标签，并支持勾选 **`导入自动加`** 在粘贴或批量导入时自动添加开头标签。
- **🎭 新增智能自动添加标签 (`🎭 自动添加标签` / `Auto-add tags`) & 自动切换 `Eleven v3` 模型**：支持全列表一键 **`🎭 自动添加标签`** 与单卡 **`🎭 自动加标签`**，并在使用 `[...]` 标签时自动从 `Multilingual v2` 切换至支持标签的 `Eleven v3` 模型（歌唱标签自动切换至 `Creative 0.0` 档位）。
