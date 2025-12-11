$schemasPath = ".\app\api\v1\schemas.py"

if (-Not (Test-Path $schemasPath)) {
    Write-Host "❌ Finner ikke schemas.py – feil path." -ForegroundColor Red
    exit
}

$schemas = Get-Content $schemasPath -Raw

# Sjekk om UserProfileResponse finnes
if ($schemas -match "class\s+UserProfileResponse") {
    Write-Host "✔ UserProfileResponse finnes allerede – ingen endring." -ForegroundColor Green
} else {
    Write-Host "⚠ UserProfileResponse mangler – legger til definisjon..." -ForegroundColor Yellow

    $definition = @"
class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    bio: str | None = None
    location: str | None = None
    skills: list[str] | None = None

"@

    Add-Content -Path $schemasPath -Value "`n# Auto-added by fix-schemas2.ps1`n$definition"
    Write-Host "✔ UserProfileResponse lagt til!" -ForegroundColor Green
}

Write-Host "Schemas oppdatert. Start Uvicorn igjen." -ForegroundColor Cyan
