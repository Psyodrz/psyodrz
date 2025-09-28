# Network Server Setup Guide

This guide will help you set up your portfolio website to be accessible from other devices on your network.

## Quick Start

On Windows, simply double-click the `start-network-server.bat` file.

For other operating systems, run:
```
npm run network
```

## Troubleshooting Network Access

If devices on your network can't access your website, try these solutions:

### 1. Check Firewall Settings

Windows Firewall might be blocking access to your server. To allow access:

1. Open Windows Defender Firewall (search for it in the Start menu)
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Click "Change settings" and then "Allow another app..."
4. Browse to find `node.exe` (usually in `C:\Program Files\nodejs\node.exe`)
5. Add it and make sure both Private and Public are checked
6. Click OK to save changes

### 2. Verify IP Address

Make sure you're using the correct IP address to connect. The `npm run network` command will show you the correct IP address to use.

### 3. Check Your Network Type

If you're on a public network, Windows might restrict access. Try switching to a private network if possible.

### 4. Try a Different Port

If port 7000 is being blocked, you can edit package.json to use a different port:

```json
"dev": "next dev -p 8000 -H 0.0.0.0"
```

Remember to also update the port in the start-server.js file.

## Accessing the Messages Page

After submitting messages through the contact form, you can view them at:

- http://localhost:7000/messages (on your computer)
- http://YOUR_IP:7000/messages (from other devices)

The messages are also saved as JSON files in the `messages` directory in your project folder.

## Security Note

This server configuration is intended for local network use during development. For a public website, you should deploy your portfolio to a proper hosting service like Vercel, Netlify, or GitHub Pages. 