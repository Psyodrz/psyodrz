# Auto-Update Scripts

This directory contains scripts to automatically update your GitHub repository with a single command.

## 🚀 Quick Start

### Windows (PowerShell)
```bash
npm run update
# or
npm run push
```

### macOS/Linux (Bash)
```bash
npm run update:unix
```

### Build and Deploy
```bash
npm run deploy
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm run update` | Auto-commit and push all changes (Windows) |
| `npm run update:unix` | Auto-commit and push all changes (macOS/Linux) |
| `npm run push` | Alias for `npm run update` |
| `npm run deploy` | Build the project and then update GitHub |

## 🎯 What These Scripts Do

1. **Check for changes** - Detects if there are any uncommitted changes
2. **Add all files** - Stages all changes (`git add .`)
3. **Auto-generate commit message** - Creates descriptive commit messages with:
   - Number of files changed
   - Count of added/modified/deleted files
   - Timestamp
4. **Commit changes** - Commits with the generated message
5. **Push to GitHub** - Pushes to the current branch

## 💬 Custom Commit Messages

You can also provide your own commit message:

### Windows
```bash
# Using PowerShell directly
powershell -ExecutionPolicy Bypass -File scripts/auto-update.ps1 -Message "Your custom message"

# Or modify the npm script temporarily
```

### macOS/Linux
```bash
# Using bash directly
bash scripts/auto-update.sh "Your custom message"
```

## 🔧 Example Auto-Generated Messages

```
Auto-update: 5 files changed (+2 added) (~3 modified) - 2024-09-28 21:30:15
Auto-update: 1 files changed (~1 modified) - 2024-09-28 21:35:42
Auto-update: 3 files changed (+1 added) (-2 deleted) - 2024-09-28 21:40:18
```

## 🎨 Features

- ✅ **Cross-platform** - Works on Windows, macOS, and Linux
- ✅ **Smart detection** - Only commits if there are changes
- ✅ **Colorful output** - Easy to read status messages
- ✅ **Error handling** - Stops on errors and shows helpful messages
- ✅ **Branch aware** - Pushes to the current branch automatically
- ✅ **File statistics** - Shows detailed change information

## 🛠️ Manual Usage

If you prefer to run the scripts directly:

### Windows (PowerShell)
```powershell
.\scripts\auto-update.ps1
# With custom message
.\scripts\auto-update.ps1 -Message "Fix navbar styling"
```

### macOS/Linux (Bash)
```bash
./scripts/auto-update.sh
# With custom message
./scripts/auto-update.sh "Fix navbar styling"
```

## 📋 Requirements

- Git repository initialized
- Remote origin configured (GitHub)
- PowerShell (Windows) or Bash (macOS/Linux)
- Node.js and npm installed

## 🚨 Important Notes

- These scripts will commit **ALL** changes in your repository
- Make sure you review your changes before running
- The scripts will push to your current branch
- If there are no changes, the script will exit gracefully
