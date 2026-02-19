# Digital City - Inicia backend e frontend
# Execute no PowerShell: .\start.ps1

$root = $PSScriptRoot

# Backend - nova janela
Write-Host "Iniciando backend em http://localhost:8000 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend-python'; if (Get-Command python -ErrorAction SilentlyContinue) { python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 } else { py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 }"

Start-Sleep -Seconds 2

# Frontend - nova janela
Write-Host "Iniciando frontend em http://localhost:3000 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend-react'; npm run dev"

Write-Host "`nBackend e frontend iniciados em janelas separadas." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "API:     http://localhost:8000" -ForegroundColor Yellow
