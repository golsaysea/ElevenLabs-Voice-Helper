# 协议合规参考报告 / License Compliance Reference Report

生成日期：2026-10-29  
审计基准：开源分发 / GitHub 公开仓库  
项目许可证：GPL-3.0-only

> 本文件是合规参考报告，不构成法律意见。

## 项目自身许可证 (Project License)

本仓库采用 **GPL-3.0-only** 许可证授权分发（详见根目录 `LICENSE` 文件）。

## 直接依赖兼容性 (Direct Dependency Compatibility)

| 依赖名称 (Dependency) | 许可证 (License) | 与项目协议兼容性 | 说明 (Notes) |
|---|---|---|---|
| (无外部运行时依赖) | N/A | ✅ 完全兼容 | 纯原生 Manifest V3 扩展程序，未引入任何第三方运行时库或外部 CDN 脚本。 |

## 署名义务与商用限制检查 (Attribution & Commercial Use)

- 除保留本仓库自身 `LICENSE` 声明外，无额外第三方运行时署名负担。
- 不含任何限制商用（如 `CC-BY-NC`）或源码传染冲突条款。
- 每个 Release 发布包均自动内嵌 `LICENSE`、`LICENSE.LIST`、`LICENSE.COMPLIANCE.md`、`THIRD_PARTY_NOTICES.md` 与 `SECURITY-ARTIFACTS.md`。
