const { spawn, execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration - SIMPLIFIED TO USE SINGLE PORT
const PORT = 7000;
const args = process.argv.slice(2);

// Set all modes to true by default - show all links at once
const SHOW_LOCAL = true;  // Always show local
const SHOW_NETWORK = true; // Always show network
const SHOW_GLOBAL = args.includes('--global') || args.includes('-g');
const LOAD_PROJECTS = args.includes('--load-projects') || args.includes('-p');
const LOAD_MESSAGES = args.includes('--load-messages') || args.includes('-m');
const LOAD_ALL = args.includes('--load-all') || args.includes('-a');

// Check and kill processes on ports
function killProcessOnPort(port) {
  try {
    if (process.platform === 'win32') {
      // Windows command to find and kill process on port
      const findCmd = `netstat -ano | findstr :${port}`;
      const result = execSync(findCmd, { encoding: 'utf8' });
      
      if (result) {
        const lines = result.split('\n');
        for (const line of lines) {
          if (line.includes('LISTENING')) {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid && pid !== '0') {
              console.log(`Killing process ${pid} on port ${port}`);
              try {
                execSync(`taskkill /F /PID ${pid}`);
              } catch (e) {
                // Process might already be gone
              }
            }
          }
        }
      }
    } else {
      // Unix command to find and kill process on port
      try {
        const pid = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim();
        if (pid) {
          console.log(`Killing process on port ${port}`);
          execSync(`kill -9 ${pid}`);
        }
      } catch (e) {
        // No process found on port, which is fine
      }
    }
  } catch (error) {
    // Command failed, but we can still proceed
  }
}

// Get public IP address
function getPublicIp() {
  return new Promise((resolve) => {
    https.get('https://api.ipify.org', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data.trim());
      });
    }).on('error', () => {
      resolve(null); // Return null if there's an error
    });
  });
}

// Get network addresses (both local and remote)
function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  // Add all network interfaces first
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (!iface.internal && iface.family === 'IPv4') {
        addresses.push({
          name,
          ip: iface.address,
          type: 'Network'
        });
      }
    }
  }
  
  // Then add localhost
  addresses.push({
    name: 'localhost',
    ip: '127.0.0.1',
    type: 'Local'
  });
  
  return addresses;
}

// Display all server links at once
async function displayServerInfo(addresses) {
  console.clear();
  
  console.log('\n═════════════════════════════════════════════');
  console.log('📊 PORTFOLIO SERVER LINKS');
  console.log('═════════════════════════════════════════════');
  
  // Always show local
  console.log(`\n🏠 MAIN SITE:`);
  console.log(`   • Local:    http://localhost:${PORT}`);
  
  // Network link
  const networkAddr = addresses.find(a => a.type === 'Network')?.ip;
  if (networkAddr) {
    console.log(`   • Network:  http://${networkAddr}:${PORT}`);
  }
  
  // Global link (only if requested)
  if (SHOW_GLOBAL) {
    const publicIp = await getPublicIp();
    if (publicIp) {
      console.log(`   • Global:   http://${publicIp}:${PORT}`);
    }
  }
  
  // Admin links
  console.log(`\n👑 ADMIN PANEL:`);
  console.log(`   • Local:    http://localhost:${PORT}/admin`);
  
  if (networkAddr) {
    console.log(`   • Network:  http://${networkAddr}:${PORT}/admin`);
  }
  
  if (SHOW_GLOBAL) {
    const publicIp = await getPublicIp();
    if (publicIp) {
      console.log(`   • Global:   http://${publicIp}:${PORT}/admin`);
    }
  }
  
  console.log('\n═════════════════════════════════════════════');
  console.log('Press Ctrl+C to stop the server');
  console.log('═════════════════════════════════════════════\n');
}

// Update .env.local with the network URL
async function updateEnvFile(addresses) {
  const envPath = path.join(process.cwd(), '.env.local');
  let networkAddr = addresses.find(a => a.type === 'Network')?.ip || '127.0.0.1';
  
  // If in global mode, try to get the public IP
  if (SHOW_GLOBAL) {
    const publicIp = await getPublicIp();
    if (publicIp) {
      networkAddr = publicIp;
    }
  }
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `NEXT_PUBLIC_API_URL=http://${networkAddr}:${PORT}\n`);
    fs.appendFileSync(envPath, `NEXT_PUBLIC_ADMIN_URL=http://${networkAddr}:${PORT}/admin\n`);
  } else {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update or add API URL
    if (envContent.includes('NEXT_PUBLIC_API_URL=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_API_URL=.*/,
        `NEXT_PUBLIC_API_URL=http://${networkAddr}:${PORT}`
      );
    } else {
      envContent += `\nNEXT_PUBLIC_API_URL=http://${networkAddr}:${PORT}\n`;
    }
    
    // Update or add Admin URL
    if (envContent.includes('NEXT_PUBLIC_ADMIN_URL=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_ADMIN_URL=.*/,
        `NEXT_PUBLIC_ADMIN_URL=http://${networkAddr}:${PORT}/admin`
      );
    } else {
      envContent += `NEXT_PUBLIC_ADMIN_URL=http://${networkAddr}:${PORT}/admin\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
  }
}

// Start the server
function startServer() {
  // Always use 0.0.0.0 to enable both local and network access
  const cmd = 'npx';
  const cmdArgs = ['next', 'dev', '-p', PORT.toString(), '-H', '0.0.0.0'];
  
  const serverProcess = spawn(cmd, cmdArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'  // Increase memory limit for better performance
    }
  });
  
  // Log any output for debugging
  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
  });
  
  // Log any error that happens on startup
  serverProcess.on('error', (error) => {
    console.error('Server error:', error.message);
    process.exit(1);
  });
  
  // Only log fatal errors
  serverProcess.stderr.on('data', (data) => {
    const output = data.toString();
    console.error(output);
    if (output.includes('EADDRINUSE')) {
      console.error('Port already in use. Please try again.');
      process.exit(1);
    }
  });
  
  return serverProcess;
}

// Monitor server health
function monitorServerHealth(server, port, name) {
  const interval = setInterval(() => {
    // Check if server process is still running
    if (server.killed || server.exitCode !== null) {
      console.log(`${name} server seems to be down, attempting to restart...`);
      
      // Try to kill any lingering process
      killProcessOnPort(port);
      
      // Restart the server
      server = startServer();
      
      console.log(`${name} server restarted`);
    }
  }, 30000); // Check every 30 seconds
  
  return interval;
}

// Check MongoDB status
function checkMongoDB() {
  console.log('\n📊 MONGODB STATUS CHECK');
  console.log('═════════════════════════════════════════════');
  
  let mongoRunning = false;
  
  try {
    // Check MongoDB service status
    if (process.platform === 'win32') {
      console.log('Checking for MongoDB Windows service...');
      try {
        const serviceCheck = execSync('sc query MongoDB', { encoding: 'utf8' });
        if (serviceCheck.includes('RUNNING')) {
          console.log('✅ MongoDB service is running');
          mongoRunning = true;
        } else {
          console.log('❌ MongoDB service is installed but not running');
          try {
            console.log('Attempting to start MongoDB service...');
            execSync('net start MongoDB', { encoding: 'utf8' });
            console.log('✅ MongoDB service started successfully');
            mongoRunning = true;
          } catch (e) {
            console.log('❌ Failed to start MongoDB service');
          }
        }
      } catch (e) {
        console.log('MongoDB is not installed as a Windows service');
        
        // Check for MongoDB running as a process
        try {
          const processCheck = execSync('tasklist | findstr mongod', { encoding: 'utf8' });
          if (processCheck.includes('mongod.exe')) {
            console.log('✅ MongoDB is running as a process');
            mongoRunning = true;
          }
        } catch (e) {
          console.log('❌ MongoDB process not found');
          
          // Display help message
          console.log('\nTo use MongoDB with this application:');
          console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
          console.log('2. Or use the install-mongodb.bat script included with this application');
          console.log('3. Start MongoDB before running this server\n');
        }
      }
    } else {
      // Unix/Linux/Mac
      try {
        const serviceCheck = execSync('systemctl status mongodb || systemctl status mongod', { encoding: 'utf8' });
        if (serviceCheck.includes('active (running)')) {
          console.log('✅ MongoDB service is running');
          mongoRunning = true;
        } else {
          console.log('❌ MongoDB service is installed but not running');
        }
      } catch (e) {
        console.log('MongoDB service not found, checking process...');
        
        try {
          const processCheck = execSync('pgrep -l mongod', { encoding: 'utf8' });
          if (processCheck) {
            console.log('✅ MongoDB is running as a process');
            mongoRunning = true;
          }
        } catch (e) {
          console.log('❌ MongoDB process not found');
          
          // Display help message
          console.log('\nTo use MongoDB with this application:');
          console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
          console.log('2. Start MongoDB before running this server\n');
        }
      }
    }
    
    console.log('═════════════════════════════════════════════');
    return mongoRunning;
  } catch (error) {
    console.error('Error checking MongoDB status:', error.message);
    console.log('═════════════════════════════════════════════');
    return false;
  }
}

// Load sample projects
function loadSampleProjects() {
  if (!LOAD_PROJECTS && !LOAD_ALL) return;
  
  console.log('Loading sample projects into database...');
  try {
    // Check if MongoDB is running before attempting to load projects
    if (checkMongoDB()) {
      const projPath = path.join(process.cwd(), 'src', 'scripts', 'load-projects.js');
      if (fs.existsSync(projPath)) {
        execSync('node src/scripts/load-projects.js', { stdio: 'inherit' });
        console.log('Projects loaded successfully');
      } else {
        console.log('Projects loader script not found');
      }
    } else {
      console.log('Skipping project loading - MongoDB not running');
    }
  } catch (error) {
    console.error('Error loading sample projects:', error.message);
  }
}

// Load sample messages
function loadSampleMessages() {
  if (!LOAD_MESSAGES && !LOAD_ALL) return;
  
  console.log('Loading sample messages into database...');
  try {
    // Check if MongoDB is running before attempting to load messages
    if (checkMongoDB()) {
      const msgPath = path.join(process.cwd(), 'src', 'scripts', 'load-messages.js');
      if (fs.existsSync(msgPath)) {
        execSync('node src/scripts/load-messages.js', { stdio: 'inherit' });
        console.log('Messages loaded successfully');
      } else {
        console.log('Messages loader script not found');
      }
    } else {
      console.log('Skipping message loading - MongoDB not running');
    }
  } catch (error) {
    console.error('Error loading sample messages:', error.message);
  }
}

// Main function
async function main() {
  try {
    // Kill any existing processes on our port
    killProcessOnPort(PORT);
    
    // Check MongoDB status
    checkMongoDB();
    
    // Load sample data if requested
    loadSampleProjects();
    loadSampleMessages();
    
    const addresses = getNetworkAddresses();
    
    // Update .env.local with the network URL (silently)
    await updateEnvFile(addresses);
    
    // Display server information with all links
    await displayServerInfo(addresses);
    
    // Start server
    let server = startServer();
    
    // Set up health monitoring
    const healthCheck = monitorServerHealth(server, PORT, 'Next.js');
    
    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      console.log('Shutting down server...');
      
      // Clear health check interval
      clearInterval(healthCheck);
      
      // Kill server process
      server.kill();
      
      // Give processes a moment to shut down
      setTimeout(() => {
        process.exit(0);
      }, 500);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(err => {
  console.error('Server error:', err);
  process.exit(1);
}); 