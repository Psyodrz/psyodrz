# Auto-update script for GitHub repository
# This script automatically adds, commits, and pushes changes to GitHub

param(
    [string]$Message = ""
)

Write-Host "Starting auto-update process..." -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not in a git repository!" -ForegroundColor Red
    exit 1
}

# Check if there are any changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes detected. Repository is up to date!" -ForegroundColor Green
    exit 0
}

Write-Host "Changes detected:" -ForegroundColor Yellow
git status --short

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Blue
git add .

# Generate automatic commit message if not provided
if (-not $Message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $changedFiles = (git diff --cached --name-only | Measure-Object).Count
    $addedFiles = (git diff --cached --diff-filter=A --name-only | Measure-Object).Count
    $modifiedFiles = (git diff --cached --diff-filter=M --name-only | Measure-Object).Count
    $deletedFiles = (git diff --cached --diff-filter=D --name-only | Measure-Object).Count
    
    $Message = "Auto-update: $changedFiles files changed"
    
    if ($addedFiles -gt 0) { $Message += " (+$addedFiles added)" }
    if ($modifiedFiles -gt 0) { $Message += " (~$modifiedFiles modified)" }
    if ($deletedFiles -gt 0) { $Message += " (-$deletedFiles deleted)" }
    
    $Message += " - $timestamp"
}

# Commit changes
Write-Host "Committing changes with message: '$Message'" -ForegroundColor Blue
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to commit changes!" -ForegroundColor Red
    exit 1
}

# Get current branch name
$branch = git rev-parse --abbrev-ref HEAD

# Push to GitHub
Write-Host "Pushing to GitHub (origin/$branch)..." -ForegroundColor Blue
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully updated GitHub repository!" -ForegroundColor Green
    Write-Host "View your changes at: https://github.com/Psyodrz/psyodrz" -ForegroundColor Cyan
} else {
    Write-Host "Error: Failed to push to GitHub!" -ForegroundColor Red
    exit 1
}

Write-Host "Auto-update completed successfully!" -ForegroundColor Green
