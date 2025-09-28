#!/bin/bash

# Auto-update script for GitHub repository
# This script automatically adds, commits, and pushes changes to GitHub

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Parse command line arguments
MESSAGE=""
while [[ $# -gt 0 ]]; do
    case $1 in
        -m|--message)
            MESSAGE="$2"
            shift 2
            ;;
        *)
            MESSAGE="$1"
            shift
            ;;
    esac
done

echo -e "${CYAN}🚀 Starting auto-update process...${NC}"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a git repository!${NC}"
    exit 1
fi

# Check if there are any changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No changes detected. Repository is up to date!${NC}"
    exit 0
fi

echo -e "${YELLOW}📝 Changes detected:${NC}"
git status --short

# Add all changes
echo -e "${BLUE}📦 Adding all changes...${NC}"
git add .

# Generate automatic commit message if not provided
if [ -z "$MESSAGE" ]; then
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    changed_files=$(git diff --cached --name-only | wc -l)
    added_files=$(git diff --cached --diff-filter=A --name-only | wc -l)
    modified_files=$(git diff --cached --diff-filter=M --name-only | wc -l)
    deleted_files=$(git diff --cached --diff-filter=D --name-only | wc -l)
    
    MESSAGE="Auto-update: $changed_files files changed"
    
    if [ "$added_files" -gt 0 ]; then MESSAGE="$MESSAGE (+$added_files added)"; fi
    if [ "$modified_files" -gt 0 ]; then MESSAGE="$MESSAGE (~$modified_files modified)"; fi
    if [ "$deleted_files" -gt 0 ]; then MESSAGE="$MESSAGE (-$deleted_files deleted)"; fi
    
    MESSAGE="$MESSAGE - $timestamp"
fi

# Commit changes
echo -e "${BLUE}💾 Committing changes with message: '$MESSAGE'${NC}"
git commit -m "$MESSAGE"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Failed to commit changes!${NC}"
    exit 1
fi

# Get current branch name
branch=$(git rev-parse --abbrev-ref HEAD)

# Push to GitHub
echo -e "${BLUE}📤 Pushing to GitHub (origin/$branch)...${NC}"
git push origin "$branch"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully updated GitHub repository!${NC}"
    echo -e "${CYAN}🌐 View your changes at: https://github.com/Psyodrz/psyodrz${NC}"
else
    echo -e "${RED}❌ Error: Failed to push to GitHub!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Auto-update completed successfully!${NC}"
