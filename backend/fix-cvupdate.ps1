$schemasPath = ".\app\api\v1\schemas.py"

if (-Not (Test-Path $schemasPath)) {
    Write-Host "❌ Finner ikke schemas.py – feil path." -ForegroundColor Red
    exit
}

$schemas = Get-Content $schemasPath -Raw

# Sjekk om CVUpdate finnes
if ($schemas -match "class\s+CVUpdate") {
    Write-Host "✔ CVUpdate finnes allerede – ingen endring." -ForegroundColor Green
} else {
    Write-Host "⚠ CVUpdate mangler – legger til definisjon..." -ForegroundColor Yellow

    $definition = @"
class CVUpdate(BaseModel):
    user_id: str
    experience: list[dict] | None = None
    education: list[dict] | None = None
    skills: list[str] | None = None
    summary: str | None = None

"@

    Add-Content -Path $schemasPath -Value "`n# Auto-added by fix-cvupdate.ps1`n$definition"
    Write-Host "✔ CVUpdate lagt til!" -ForegroundColor Green
}

Write-Host "Schemas oppdatert. Start Uvicorn igjen." -ForegroundColor Cyan
