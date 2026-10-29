---
name: license-audit
description: 依赖协议合规检查 — 当依赖文件或外部 CDN 依赖变更时自动检查协议合规性
triggers:
  - file_changed: "package.json"
  - file_changed: "go.mod"
  - file_changed: "requirements.txt"
  - file_changed: "requirements-build.txt"
  - file_changed: "pyproject.toml"
  - file_changed: "Cargo.toml"
  - file_changed: "*.csproj"
  - file_changed: "*.html"
  - file_changed: "*.HTML"
---

# 依赖协议审计 Skill

## 何时使用

当用户修改依赖声明文件、Python import、HTML CDN 脚本引用或扩展资源引用时，触发本 Skill。

## 不要使用

当用户只是阅读或查看依赖文件而没有修改时，不要触发本 Skill。

## 执行步骤

### 1. 检测变更的依赖

对比当前依赖文件与项目根目录的 `LICENSE.LIST` 中已记录的依赖，找出：

- 新增的依赖：在依赖文件或 CDN 引用中存在但 `LICENSE.LIST` 中没有的。
- 版本变更的依赖：版本号发生变化的。
- 移除的依赖：在 `LICENSE.LIST` 中存在但依赖文件或 CDN 引用中已删除的。

### 2. 查询新增/变更依赖的协议

对新增或版本变更的依赖，使用 WebSearch 查询其协议：

- npm 包：搜索 `<包名> npm package license`
- Go 模块：搜索 `<模块路径> go module license`
- Python 包：搜索 `<包名> pypi license`
- Rust 包：搜索 `<包名> crates.io license`
- .NET 包：搜索 `<包名> nuget license`
- CDN 依赖：搜索 `<库名> <版本> license cdnjs` 或 `<库名> github LICENSE file`

如果搜索结果不明确，二次搜索：`<包名> github LICENSE file`。无法确定的标记为 `UNKNOWN`。

### 3. 检查协议兼容性

读取项目根目录的 `LICENSE` 和 `LICENSE.COMPLIANCE.md`，识别项目协议。对新增或版本变更的依赖，参考协议兼容性矩阵：

https://tpscsm-docs.pages.dev/license-audit/

不兼容时警告用户并给出修复建议，例如更换项目协议、替换依赖或移除依赖。

### 4. 更新文件

1. 更新 `LICENSE.LIST`：添加、更新或移除依赖条目，并更新统计摘要。
2. 更新 `LICENSE.COMPLIANCE.md`：重新分析协议兼容性、继承限制和第三方声明。
3. 更新 `DEPENDENCY_LICENSE_AUDIT.zh-CN.md`：同步完整中文审计报告。

### 5. 风险标记

- ✅ 低风险：MIT、BSD、ISC、Apache-2.0、Unlicense、CC0-1.0
- ⚠️ 需关注：GPL、AGPL、LGPL、MPL、BSL、SSPL
- ❌ 需确认：UNKNOWN、CC-BY-NC、自定义协议

### 6. 通知用户

完成后通知用户：

- 新增、更新、移除的依赖数量。
- 新增或变更依赖的协议列表。
- 兼容性检查结论。
- 是否存在新增风险协议或 UNKNOWN 协议。

## 重要说明

- 只审计直接依赖，不审计传递依赖。
- `UNKNOWN` 协议需要用户手动确认。
- 本仓库当前因 `pedalboard` 使用 GPL-3.0-only 作为项目发布协议；如移除此依赖，可重新评估项目协议。
