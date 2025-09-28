const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to clean
const dirsToClean = [
  '.next',
  'node_modules/.cache',
];

// Clean directories
console.log('Cleaning Next.js cache and temporary files...');
dirsToClean.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    try {
      if (process.platform === 'win32') {
        // Windows requires different command for directory removal
        execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'ignore' });
      } else {
        execSync(`rm -rf "${dirPath}"`, { stdio: 'ignore' });
      }
      console.log(`✓ Removed ${dir}`);
    } catch (error) {
      console.error(`Error removing ${dir}:`, error.message);
    }
  }
});

// Kill any Next.js processes
function killNextProcesses() {
  try {
    if (process.platform === 'win32') {
      // Find and kill Node.js processes that might be running Next.js
      try {
        execSync('taskkill /f /im node.exe', { stdio: 'ignore' });
        console.log('✓ Killed any running Node.js processes');
      } catch (e) {
        // No processes found or unable to kill
      }
    } else {
      // Unix - find and kill Node.js processes that contain "next"
      try {
        execSync("ps aux | grep next | grep -v grep | awk '{print $2}' | xargs kill -9", { stdio: 'ignore' });
        console.log('✓ Killed any running Next.js processes');
      } catch (e) {
        // No processes found or unable to kill
      }
    }
  } catch (error) {
    // Command failed, but we can still proceed
  }
}

// Kill any running Next.js processes
killNextProcesses();

// Create clean batch file for Windows
const cleanBatContent = `@echo off
echo Cleaning Next.js project...
node reset-next.js
npm install
echo Done! Project is ready to start.
pause`;

fs.writeFileSync(path.join(process.cwd(), 'clean-nextjs.bat'), cleanBatContent);
console.log('✓ Created clean-nextjs.bat file');

console.log('\nNext.js project reset complete! Run "npm install" to reinstall dependencies.'); 