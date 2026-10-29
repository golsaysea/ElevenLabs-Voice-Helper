# 安全策略 / Security Policy

## 支持版本 (Supported Versions)

| 版本 (Version) | 支持状态 (Supported) |
|---|---|
| `v3.3.0` | ✅ 支持 |

## 漏洞报告 (Reporting a Vulnerability)

请通过 GitHub Security Advisories 私密提交安全问题报告。切勿在公开 Issue 中粘贴真实的 API Key、Bearer Token、Cookie 或包含凭据的请求头。

## 凭据与数据处理安全规范 (Credential & Data Handling)

- 浏览器扩展仅在本地浏览器存储 (`chrome.storage.local`) 中保存用户凭据。
- 严禁将任何真实 API Key、Token、私钥或账号恢复快照提交至 Git 仓库。
- 自动化发布工作流仅使用临时 `GITHUB_TOKEN` 与 OIDC 令牌完成打包、SPDX SBOM 生成与构件签名证明。

## 发布安全构件 (Release Security Artifacts)

每次版本发布均包含以下可验证构件：

- 经过合规校验的扩展压缩包：`elevenlabs-token-helper-v3.3.0.zip`、`elevenlabs-api-helper-v6.6.0.zip`
- `SHA256SUMS.txt`（SHA-256 哈希校验清单）
- `SBOM.spdx.json`（SPDX 2.3 标准软件物料清单）
- `BUILD-PROVENANCE.txt`（构建溯源元数据）
