# 安全构件验证指南 / Security Artifacts & Verification Guide

`golsaysea/ElevenLabs-Voice-Helper` 的每次正式发布均提供可验证的供应链安全构件：

| 构件名称 (Artifact) | 说明 (Description) |
|---|---|
| `elevenlabs-token-helper-v3.3.0.zip` | 主扩展程序发布包 (MV3) |
| `elevenlabs-api-helper-v6.6.0.zip` | 辅助扩展程序发布包 (MV3) |
| `SHA256SUMS.txt` | 所有发布 `.zip` 压缩包的 SHA-256 校验和 |
| `SBOM.spdx.json` | SPDX 2.3 标准软件物料清单 (Software Bill of Materials) |
| `BUILD-PROVENANCE.txt` | 构建版本标签、提交哈希、构建环境与 UTC 时间戳 |

## 1. 校验 SHA-256 哈希值 (Verify SHA-256 Checksums)

Linux / macOS:

```bash
sha256sum -c SHA256SUMS.txt
```

Windows PowerShell:

```powershell
Get-FileHash .\elevenlabs-token-helper-v3.3.0.zip -Algorithm SHA256
Get-FileHash .\elevenlabs-api-helper-v6.6.0.zip -Algorithm SHA256
```

## 2. 验证 GitHub 构件证明 (Verify GitHub Artifact Attestation)

使用 GitHub CLI (`gh`):

```bash
gh attestation verify elevenlabs-token-helper-v3.3.0.zip -R golsaysea/ElevenLabs-Voice-Helper
gh attestation verify elevenlabs-api-helper-v6.6.0.zip -R golsaysea/ElevenLabs-Voice-Helper
```

## 3. 查看软件物料清单 (Inspect SBOM)

`SBOM.spdx.json` 遵循 SPDX 2.3 标准，完整记录了发布包组件、版本号、下载源及许可证结论（`GPL-3.0-only`，零外部第三方运行时依赖）。
