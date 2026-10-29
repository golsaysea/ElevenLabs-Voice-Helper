# 依赖协议与静态安全审计报告 / Dependency & License Audit Report

审计日期：2026-10-29  
仓库名称：`golsaysea/ElevenLabs-Voice-Helper`  
发布版本：`v3.3.0`  
审计指南：https://tpscsm-docs.pages.dev/license-audit/

## 1. 审计范围与依赖来源 (Scope & Dependency Sources)

| 发布包名称 (Package) | 源码路径 (Path) | 类型 (Type) | 外部运行时依赖 (External Dependencies) |
|---|---|---|---|
| `elevenlabs-token-helper-v3.3.0` | `packages/elevenlabs-token-helper` | Chrome MV3 Extension | 无 (0) |
| `elevenlabs-api-helper-v6.6.0` | `packages/elevenlabs-api-helper` | Chrome MV3 Extension | 无 (0) |

扩展包内不包含 `package.json`、`go.mod`、`requirements.txt`、`pyproject.toml`、`Cargo.toml`，也不包含任何外部 `<script src="https://...">` CDN 引用。

## 2. 静态代码安全与隐私检查结果 (Static Security & Code Hygiene Checks)

- **远程脚本注入检查 (Remote Script Injection)**：0 个外部远程脚本标签（PASS）
- **动态代码执行检查 (Dynamic Code Execution)**：0 个 `eval()` 或 `new Function()` 调用（PASS）
- **硬编码敏感凭据扫描 (Hardcoded Credentials)**：0 个硬编码 API Key、Bearer Token 或私钥文件（PASS）
- **本机路径隐私检查 (Local Path Leakage)**：0 个工作站本机绝对路径残留（PASS）
- **Manifest V3 合规检查 (MV3 Compliance)**：全部扩展包均采用 `"manifest_version": 3` 且收窄 `host_permissions`（PASS）

## 3. 合规与安全交付物清单 (Generated Compliance Artifacts)

| 文件名 | 用途说明 |
|---|---|
| `LICENSE` | 项目开源许可证全文 (GPL-3.0-only) |
| `LICENSE.LIST` | 直接运行时依赖协议清单 |
| `LICENSE.COMPLIANCE.md` | 协议兼容性参考报告 |
| `THIRD_PARTY_NOTICES.md` | 第三方组件声明摘要 |
| `PRIVACY.md` | 本地数据存储与隐私政策声明 |
| `SECURITY.md` | 安全策略与凭据处理规范 |
| `SECURITY-ARTIFACTS.md` | SHA256、SPDX SBOM 与 GitHub 构件证明验证指南 |
| `scripts/validate-release.ps1` | 发布前与打包后自动化安全合规校验脚本 |
