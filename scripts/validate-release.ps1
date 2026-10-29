param(
    [string]$PackagePath = ""
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$failed = $false

function Add-Failure([string]$Message) {
    Write-Host "FAIL: $Message" -ForegroundColor Red
    $script:failed = $true
}

function Add-Ok([string]$Message) {
    Write-Host "OK: $Message" -ForegroundColor Green
}

$requiredFiles = @(
    "README.md",
    "RELEASE_NOTES.md",
    "PRIVACY.md",
    "SECURITY.md",
    "SECURITY-ARTIFACTS.md",
    "LICENSE",
    "LICENSE.LIST",
    "LICENSE.COMPLIANCE.md",
    "DEPENDENCY_LICENSE_AUDIT.md",
    "THIRD_PARTY_NOTICES.md",
    ".gitignore",
    ".github/workflows/release.yml"
)

foreach ($file in $requiredFiles) {
    if (Test-Path (Join-Path $root $file)) {
        Add-Ok "required file exists: $file"
    } else {
        Add-Failure "required file missing: $file"
    }
}

$manifests = Get-ChildItem -Path (Join-Path $root "packages") -Filter "manifest.json" -Recurse -File
if ($manifests.Count -lt 1) {
    Add-Failure "No package manifest.json found under packages/."
}
foreach ($mFile in $manifests) {
    try {
        $m = Get-Content -Raw -Encoding UTF8 -LiteralPath $mFile.FullName | ConvertFrom-Json
        if ($m.manifest_version -ne 3) {
            Add-Failure "manifest_version must be 3 in $($mFile.FullName)"
        } else {
            Add-Ok "Valid MV3 manifest: $($mFile.FullName) (v$($m.version))"
        }
    } catch {
        Add-Failure "Invalid JSON in $($mFile.FullName): $($_.Exception.Message)"
    }
}

$sensitivePatterns = @("*.pem", "*.key", "*.p12", "*.pfx", "*.crt", "*.cer", "*.env", ".env.*", "*.mp3", "*.webm", "*.wav", "recovered-accounts.json")
foreach ($pattern in $sensitivePatterns) {
    $matches = Get-ChildItem -Path $root -Recurse -Force -File -Filter $pattern | Where-Object { $_.FullName -notmatch "\\\.git\\" }
    foreach ($match in $matches) {
        Add-Failure "Sensitive or generated file should not be committed: $($match.FullName)"
    }
}

$textFiles = Get-ChildItem -Path $root -Recurse -Force -File | Where-Object {
    $_.FullName -notmatch "\\\.git\\" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -ne $PSCommandPath -and
    ($_.Extension -in @(".html", ".js", ".json", ".md", ".css", ".yml", ".yaml"))
}

foreach ($file in $textFiles) {
    $content = Get-Content -Raw -Encoding UTF8 -LiteralPath $file.FullName
    if ($file.Extension -eq ".html" -and $content -match '<script[^>]+src=.https?://') {
        Add-Failure "Remote script tag found in $($file.Name)"
    }
    if ($file.Extension -in @(".js", ".html")) {
        if ($content -match "\beval\s*\(") { Add-Failure "eval() found in $($file.Name)" }
        if ($content -match "\bnew\s+Function\s*\(") { Add-Failure "new Function() found in $($file.Name)" }
    }
    if ($content -match "[A-Za-z]:\\Users\\|/Users/|/home/") {
        Add-Failure "Absolute local path found in $($file.Name)"
    }
    if ($content -match "BEGIN (RSA |EC |OPENSSH |PRIVATE )?KEY|sk_[a-zA-Z0-9]{24,}") {
        Add-Failure "Hardcoded secret found in $($file.Name)"
    }
}

if ($PackagePath) {
    if (-not (Test-Path -LiteralPath $PackagePath)) {
        Add-Failure "Package path does not exist: $PackagePath"
    } else {
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path $PackagePath))
        try {
            $entries = $zip.Entries | ForEach-Object { $_.FullName }
            if ($entries -contains "manifest.json") {
                Add-Ok "Package root contains manifest.json: $(Split-Path $PackagePath -Leaf)"
            } else {
                Add-Failure "Package root missing manifest.json: $PackagePath"
            }
            $blocked = $entries | Where-Object {
                $_ -match "^\.git/" -or $_ -match "^\.github/" -or $_ -match "(^|/)(test|tests)/" -or $_ -match "\.(pem|key|p12|pfx|env|map)$"
            }
            foreach ($b in $blocked) {
                Add-Failure "Blocked entry inside zip: $b"
            }
        } finally {
            $zip.Dispose()
        }
    }
}

if ($failed) {
    Write-Host "Release validation FAILED." -ForegroundColor Red
    exit 1
}
Write-Host "Release validation PASSED." -ForegroundColor Green