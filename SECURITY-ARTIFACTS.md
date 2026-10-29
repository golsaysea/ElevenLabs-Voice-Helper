# Security Artifacts & Verification Guide

Each tagged release of golsaysea/ElevenLabs-Voice-Helper produces verifiable supply-chain security artifacts:

| Artifact | Description |
|----------|-------------|
| $(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[0]).zip | Primary MV3 browser extension package |
| $(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[1]).zip | Secondary MV3 browser extension package |
| SHA256SUMS.txt | SHA-256 digests for all packaged .zip archives |
| SBOM.spdx.json | SPDX 2.3 Software Bill of Materials |
| BUILD-PROVENANCE.txt | Build tag, commit SHA, runner OS, and UTC timestamp |
| GitHub Artifact Attestation | OIDC-signed build provenance attestation |

## 1. Verify SHA-256 Checksums

Linux / macOS:

`ash
sha256sum -c SHA256SUMS.txt
`

Windows PowerShell:

`powershell
Get-FileHash .\elevenlabs-token-helper-v3.3.0.zip -Algorithm SHA256
`

## 2. Verify GitHub Artifact Attestation

Using GitHub CLI (gh):

`ash
gh attestation verify elevenlabs-token-helper-v3.3.0.zip -R golsaysea/ElevenLabs-Voice-Helper
gh attestation verify elevenlabs-api-helper-v6.6.0.zip -R golsaysea/ElevenLabs-Voice-Helper
`

## 3. Inspect SBOM

SBOM.spdx.json conforms to SPDX 2.3 and records all packaged components and their verified license conclusions (GPL-3.0-only, zero external third-party runtime dependencies).