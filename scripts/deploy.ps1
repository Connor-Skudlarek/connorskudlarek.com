<#
.SYNOPSIS
    Build the site and deploy it to the Lightsail instance.

.DESCRIPTION
    Builds the static export, uploads it as a new timestamped release, then
    flips the "current" symlink that Apache serves from. The flip is atomic and
    needs no Apache reload, so a deploy never leaves the site half-updated.

    Rollback: ssh in and point the symlink at an older release directory.
      ln -sfn /home/bitnami/www/releases/<older> /home/bitnami/www/current
#>
[CmdletBinding()]
param(
    [string]$KeyPath = "$env:USERPROFILE\.ssh\lightsail.pem",
    [string]$Server = "bitnami@54.70.47.58",
    [string]$Root = "/home/bitnami/www",
    [int]$KeepReleases = 5,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$ssh = "$env:WINDIR\System32\OpenSSH\ssh.exe"
$repo = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $KeyPath)) {
    throw "SSH key not found at $KeyPath"
}

if (-not $SkipBuild) {
    Write-Host "Building..." -ForegroundColor Cyan
    Push-Location $repo
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "Build failed" }
    }
    finally { Pop-Location }
}

$out = Join-Path $repo "out"
if (-not (Test-Path $out)) { throw "No build output at $out" }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$release = "$Root/releases/$stamp"

Write-Host "Uploading release $stamp..." -ForegroundColor Cyan
& $ssh -i $KeyPath $Server "mkdir -p '$release'"
if ($LASTEXITCODE -ne 0) { throw "Could not create release directory" }

# tar over ssh: one round trip, and it preserves the directory tree without
# needing rsync (which Windows does not ship).
tar czf - -C $out . | & $ssh -i $KeyPath $Server "tar xzf - -C '$release'"
if ($LASTEXITCODE -ne 0) { throw "Upload failed" }

Write-Host "Activating..." -ForegroundColor Cyan
& $ssh -i $KeyPath $Server "ln -sfn '$release' '$Root/current'"
if ($LASTEXITCODE -ne 0) { throw "Symlink flip failed" }

# Keep a few releases around so rollback is always one command away.
& $ssh -i $KeyPath $Server "cd '$Root/releases' && ls -1dt */ | tail -n +$($KeepReleases + 1) | xargs -r rm -rf"

Write-Host "Verifying..." -ForegroundColor Cyan
$checks = @("/", "/projects/murphy/", "/projects/wafer-wizards/", "/risk/", "/sitemap.xml")
$failed = @()
foreach ($path in $checks) {
    $url = "https://connorskudlarek.com$path"
    try {
        $code = (Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20).StatusCode
    }
    catch { $code = $_.Exception.Response.StatusCode.value__ }
    if ($code -eq 200) { Write-Host "  $code  $path" -ForegroundColor Green }
    else { Write-Host "  $code  $path" -ForegroundColor Red; $failed += $path }
}

if ($failed.Count -gt 0) {
    Write-Host "`nDeployed release $stamp, but $($failed.Count) check(s) failed." -ForegroundColor Yellow
    exit 1
}

Write-Host "`nDeployed release $stamp." -ForegroundColor Green
