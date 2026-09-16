<#
.SYNOPSIS
    Build the site and deploy it to the Lightsail instance.

.DESCRIPTION
    Builds the static export, uploads it as a new timestamped release, then
    flips the "current" symlink that Apache serves from. The flip is atomic and
    needs no Apache reload, so a deploy never leaves the site half-updated.

    Rollback: ssh in and point the symlink at an older release directory.
      ln -sfn $DEPLOY_ROOT/releases/<older> $DEPLOY_ROOT/current
#>
[CmdletBinding()]
param(
    [string]$KeyPath = $env:DEPLOY_KEY,
    [string]$Server = $env:DEPLOY_SERVER,
    [string]$Root = $env:DEPLOY_ROOT,
    [int]$KeepReleases = 5,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
foreach ($pair in @(@("DEPLOY_SERVER", $Server), @("DEPLOY_KEY", $KeyPath), @("DEPLOY_ROOT", $Root))) {
    if ([string]::IsNullOrWhiteSpace($pair[1])) { throw "Set $($pair[0]) (or pass the matching parameter)" }
}
$ssh = "$env:WINDIR\System32\OpenSSH\ssh.exe"
$scp = "$env:WINDIR\System32\OpenSSH\scp.exe"
$tar = "$env:WINDIR/System32/tar.exe"
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

# Stage the archive on disk rather than piping tar into ssh: PowerShell's
# pipeline carries text, not raw bytes, and corrupts the stream.
$archive = Join-Path ([System.IO.Path]::GetTempPath()) "portfolio-$stamp.tgz"
try {
    & $tar czf $archive -C $out .
    if ($LASTEXITCODE -ne 0) { throw "Could not create archive" }

    & $scp -i $KeyPath $archive "${Server}:/tmp/deploy.tgz"
    if ($LASTEXITCODE -ne 0) { throw "Upload failed" }

    & $ssh -i $KeyPath $Server "tar xzf /tmp/deploy.tgz -C '$release' && rm -f /tmp/deploy.tgz"
    if ($LASTEXITCODE -ne 0) { throw "Remote extract failed" }
}
finally {
    Remove-Item $archive -ErrorAction SilentlyContinue
}

Write-Host "Activating..." -ForegroundColor Cyan
& $ssh -i $KeyPath $Server "ln -sfn '$release' '$Root/current'"
if ($LASTEXITCODE -ne 0) { throw "Symlink flip failed" }

# Keep a few releases around so rollback is always one command away.
& $ssh -i $KeyPath $Server "cd '$Root/releases' && ls -1dt */ | tail -n +$($KeepReleases + 1) | xargs -r rm -rf"

Write-Host "Verifying..." -ForegroundColor Cyan
$checks = @(
    "/",
    "/projects/murphy/",
    "/projects/wafer-wizards/",
    "/risk/",
    "/sitemap.xml"
)
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
