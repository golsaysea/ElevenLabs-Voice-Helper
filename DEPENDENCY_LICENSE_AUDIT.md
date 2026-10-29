# Dependency & License Audit Report

Audit Date: 2026-10-25  
Repository: golsaysea/ElevenLabs-Voice-Helper  
Release Version: $versionTag  
Audit Guideline: https://tpscsm-docs.pages.dev/license-audit/

## 1. Scope & Dependency Sources

| Package | Path | Type | External Dependencies |
|---------|------|------|-----------------------|
| $(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[0]) | $(packages/elevenlabs-token-helper packages/elevenlabs-api-helper[0]) | Chrome MV3 Extension | None (0) |
| $(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[1]) | $(packages/elevenlabs-token-helper packages/elevenlabs-api-helper[1]) | Chrome MV3 Extension | None (0) |

No package.json, go.mod, equirements.txt, pyproject.toml, Cargo.toml, .csproj, or external <script src="https://..."> CDN references exist in the extension packages.

## 2. Static Security & Code Hygiene Checks

- **Remote Script Injection**: 0 external script tags found in HTML files.
- **Dynamic Code Execution**: 0 eval() or 
ew Function() calls found.
- **Hardcoded Credentials**: 0 API keys, Bearer tokens, or private keys found in source tree.
- **Local Path Leakage**: 0 workstation absolute paths found in source tree.
- **Manifest V3 Compliance**: All extension packages use "manifest_version": 3 with scoped host_permissions.

## 3. Generated Compliance Artifacts

| File | Purpose |
|------|---------|
| LICENSE | Project license text (GPL-3.0-only) |
| LICENSE.LIST | Direct runtime dependency inventory |
| LICENSE.COMPLIANCE.md | License compatibility report |
| THIRD_PARTY_NOTICES.md | Third-party notices summary |
| PRIVACY.md | Local storage and privacy policy |
| SECURITY.md | Security policy and credential handling rules |
| SECURITY-ARTIFACTS.md | SHA256, SPDX SBOM, and GitHub Artifact Attestation verification guide |
| scripts/validate-release.ps1 | Automated pre-release and post-package security validator |