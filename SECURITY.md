# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| v3.3.0 | Yes |

## Reporting a Vulnerability

Please report security issues privately via GitHub Security Advisories. Do not post live API keys, Bearer tokens, cookies, or sensitive request headers in public issues.

## Credential & Data Handling

- Browser extensions store credentials strictly inside local browser storage (chrome.storage.local).
- Never commit API keys, tokens, cookies, or account recovery snapshots to Git.
- The automated release workflow uses only the ephemeral GITHUB_TOKEN and OIDC token to package archives, generate SPDX SBOMs, and sign GitHub Artifact Attestations.

## Release Security Artifacts

Every tagged release includes:

- Verified .zip extension packages ($(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[0]).zip, $(elevenlabs-token-helper-v3.3.0 elevenlabs-api-helper-v6.6.0[1]).zip)
- SHA256SUMS.txt
- SBOM.spdx.json (SPDX 2.3 format)
- BUILD-PROVENANCE.txt
- GitHub OIDC Artifact Attestation (ctions/attest@v4)