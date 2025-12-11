$schemasPath = ".\app\api\v1\schemas.py"

if (-Not (Test-Path $schemasPath)) {
    Write-Host "❌ Finner ikke schemas.py – feil path." -ForegroundColor Red
    exit
}

$schemas = Get-Content $schemasPath -Raw

# Sjekk om UserProfileCreate finnes
if ($schemas -match "class\s+UserProfileCreate") {
    Write-Host "✔ UserProfileCreate finnes allerede i schemas.py – ingen endring nødvendig." -ForegroundColor Green
} else {
    Write-Host "⚠ UserProfileCreate mangler – legger til definisjon..." -ForegroundColor Yellow

    $definition = @"
class UserProfileCreate(BaseModel):
    user_id: str
    bio: str | None = None
    location: str | None = None
    skills: list[str] | None = None

"@

    Add-Content -Path $schemasPath -Value "`n# Auto-added by fix-schemas.ps1`n$definition"
    Write-Host "✔ UserProfileCreate er lagt til i schemas.py" -ForegroundColor Green
}

Write-Host "Script ferdig! Du kan nå kjøre Uvicorn igjen." -ForegroundColor Cyan
