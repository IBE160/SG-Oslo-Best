$schemasPath = ".\app\api\v1\schemas.py"
$usersPath = ".\app\api\v1\users.py"

if (-Not (Test-Path $schemasPath)) {
    Write-Host " Finner ikke schemas.py!" -ForegroundColor Red
    exit
}

if (-Not (Test-Path $usersPath)) {
    Write-Host " Finner ikke users.py!" -ForegroundColor Red
    exit
}

$schemasContent = Get-Content $schemasPath -Raw
$usersContent = Get-Content $usersPath -Raw

# Finn alle imports fra schemas
$importPattern = "from\s+\.schemas\s+import\s+\(([\s\S]*?)\)"
$matches = [regex]::Matches($usersContent, $importPattern)

if ($matches.Count -eq 0) {
    Write-Host " Fant ingen imports fra schemas i users.py" -ForegroundColor Red
    exit
}

# Extract class names
$importBlock = $matches[0].Groups[1].Value
$classes = $importBlock.Split(",") | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }

Write-Host " Disse klassene blir sjekket:" -ForegroundColor Cyan
$classes | ForEach-Object { Write-Host " - $_" }

# Template for unknown classes
function Get-ClassTemplate([string]$className) {
    return @"
class $className(BaseModel):
    # Auto-generated placeholder  update fields later
    id: str | None = None
    user_id: str | None = None
    data: dict | None = None

"@
}

$added = 0

foreach ($className in $classes) {
    if ($schemasContent -match "class\s+$className") {
        Write-Host " $className finnes allerede." -ForegroundColor Green
    } else {
        Write-Host " Legger til manglende klasse: $className" -ForegroundColor Yellow
        $template = Get-ClassTemplate $className
        Add-Content -Path $schemasPath -Value "`n# Auto-added model`n$template"
        $added++
    }
}

Write-Host ""
if ($added -gt 0) {
    Write-Host " $added modeller ble lagt til i schemas.py" -ForegroundColor Green
} else {
    Write-Host " Alle modeller var allerede til stede." -ForegroundColor Green
}

Write-Host " Start backend igjen." -ForegroundColor Cyan
