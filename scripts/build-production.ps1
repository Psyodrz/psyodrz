# Production Build Script for GitHub Pages
# This script builds the project for production with the correct basePath

Write-Host "Building for production..." -ForegroundColor Green

# Set production environment
$env:NODE_ENV = "production"

# Clean previous builds
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out"
    Write-Host "Cleaned previous build" -ForegroundColor Yellow
}

if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Cleaned Next.js cache" -ForegroundColor Yellow
}

# Build the project
Write-Host "Building project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "Output directory: out/" -ForegroundColor Cyan
    Write-Host "Ready for GitHub Pages deployment" -ForegroundColor Cyan
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
