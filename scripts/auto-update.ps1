# Auto-update script for GitHub repository
# This script syncs with GitHub, then adds, commits, and pushes local changes

param(
    [string]$Message = ""
)

Write-Host "Starting auto-update process..." -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not in a git repository!" -ForegroundColor Red
    exit 1
}

# Get current branch name
$branch = git rev-parse --abbrev-ref HEAD

# First, sync with GitHub to get latest changes
Write-Host "Syncing with GitHub repository..." -ForegroundColor Blue
Write-Host "Fetching latest changes from origin/$branch..." -ForegroundColor Yellow

# Fetch latest changes from remote
git fetch origin $branch

if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Failed to fetch from remote. Continuing with local changes..." -ForegroundColor Yellow
} else {
    # Check if there are remote changes to pull
    $localCommit = git rev-parse HEAD
    $remoteCommit = git rev-parse "origin/$branch"
    
    if ($localCommit -ne $remoteCommit) {
        Write-Host "Remote changes detected. Pulling latest changes..." -ForegroundColor Yellow
        
        # Stash any local changes temporarily
        $hasLocalChanges = git status --porcelain
        if ($hasLocalChanges) {
            Write-Host "Stashing local changes temporarily..." -ForegroundColor Yellow
            git stash push -m "Auto-stash before sync - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            $stashCreated = $true
        } else {
            $stashCreated = $false
        }
        
        # Pull latest changes
        git pull origin $branch
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully synced with remote repository!" -ForegroundColor Green
            
            # Restore stashed changes if any
            if ($stashCreated) {
                Write-Host "Restoring local changes..." -ForegroundColor Yellow
                git stash pop
                
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "Warning: Merge conflicts detected after restoring local changes!" -ForegroundColor Red
                    Write-Host "Please resolve conflicts manually and run the script again." -ForegroundColor Yellow
                    exit 1
                }
            }
        } else {
            Write-Host "Error: Failed to pull from remote!" -ForegroundColor Red
            
            # Restore stashed changes if any
            if ($stashCreated) {
                Write-Host "Restoring local changes..." -ForegroundColor Yellow
                git stash pop
            }
            exit 1
        }
    } else {
        Write-Host "Local repository is up to date with remote." -ForegroundColor Green
    }
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
