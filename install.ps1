# Digital City - Instalacao de dependencias
# Execute no PowerShell: .\install.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "=== Backend (Python) ===" -ForegroundColor Cyan
Set-Location "$root\backend-python"
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m pip install -r requirements.txt
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    py -m pip install -r requirements.txt
} else {
    Write-Host "Python nao encontrado. Instale Python e adicione ao PATH." -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Frontend (Node) ===" -ForegroundColor Cyan
Set-Location "$root\frontend-react"
if (Get-Command npm -ErrorAction SilentlyContinue) {
    npm install
} else {
    Write-Host "npm nao encontrado. Instale Node.js e adicione ao PATH." -ForegroundColor Red
    exit 1
}

Set-Location $root
Write-Host "`nDependencias instaladas com sucesso." -ForegroundColor Green
Write-Host "Para iniciar o projeto, execute: .\start.ps1" -ForegroundColor Yellow
