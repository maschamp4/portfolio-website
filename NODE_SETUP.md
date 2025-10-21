# Node.js Installation Guide for Windows

## Why Do I Need Node.js?

This portfolio website uses modern web development tools that require **Node.js**:
- **Vite**: A fast build tool for modern web projects
- **Three.js**: For 3D graphics and animations
- **npm**: Package manager to install and manage dependencies

Without Node.js, you cannot run the development server or build the website.

---

## Installation Steps

### Step 1: Download Node.js

1. Visit the official Node.js website: **https://nodejs.org/**
2. You'll see two download options:
   - **LTS (Long Term Support)** - **← RECOMMENDED** 
   - Current (Latest Features)

3. **Click the LTS button** to download the recommended version
   - Example: "22.11.0 LTS (Recommended For Most Users)"
   - The LTS version is stable and well-tested

### Step 2: Run the Installer

1. Locate the downloaded file (usually in your Downloads folder)
   - File name: `node-v22.11.0-x64.msi` (version number may vary)

2. **Double-click** the installer to start

3. Follow the installation wizard:
   - Click **Next** on the welcome screen
   - **Accept** the license agreement
   - Choose installation location (default is fine: `C:\Program Files\nodejs\`)
   - **Important**: Make sure "Add to PATH" is checked ✓
   - Click **Next** → **Next** → **Install**

4. Wait for installation to complete (1-2 minutes)

5. Click **Finish**

### Step 3: Verify Installation

1. **Close any open Command Prompt or PowerShell windows**
   - This is important! The PATH changes won't take effect in already-open terminals

2. Open a **new** Command Prompt:
   - Press `Windows Key + R`
   - Type `cmd` and press Enter

3. Type the following command and press Enter:
   ```bash
   node --version
   ```
   - You should see something like: `v22.11.0`

4. Check npm (comes with Node.js):
   ```bash
   npm --version
   ```
   - You should see something like: `10.9.0`

✅ **If you see version numbers, Node.js is installed correctly!**

---

## Running Your Portfolio Website

Once Node.js is installed:

1. **Navigate to your portfolio folder:**
   ```
   C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
   ```

2. **Double-click `start.bat`** in this folder
   - The script will automatically:
     - Install all required dependencies (first time only)
     - Start the development server
     - Open your portfolio in the browser

3. **First run takes 2-5 minutes** while dependencies install
   - Subsequent runs start in seconds

4. **The portfolio will open at:** `http://localhost:3000`

5. **To stop the server:**
   - Press `Ctrl + C` in the command window
   - Or simply close the command window

---

## Troubleshooting

### 🔴 PowerShell Execution Policy Error (COMMON ISSUE)

**Error Message:**
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

**What's Happening:**
Windows PowerShell blocks npm commands for security reasons. This is a common issue and easy to fix!

**Quick Fix - Use Command Prompt Instead:**

1. **Close PowerShell**
2. **Open Command Prompt:**
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - Make sure it says "Command Prompt" (not "PowerShell")

3. **Navigate to portfolio:**
   ```cmd
   cd C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
   ```

4. **Run npm commands:**
   ```cmd
   npm install
   npm run dev
   ```

**Even Easier - Use start.bat:**
- Just double-click [`start.bat`](start.bat) in the portfolio folder
- It automatically uses Command Prompt (cmd.exe)
- No PowerShell issues!

**For detailed solutions and PowerShell fixes, see:** [`POWERSHELL_FIX.md`](POWERSHELL_FIX.md)

---

### "node is not recognized" Error After Installation

**Solution:**
1. Restart your computer (this refreshes system PATH)
2. Try the verification commands again

**Alternative:**
1. Search for "Environment Variables" in Windows
2. Check that `C:\Program Files\nodejs\` is in your PATH
3. If not, add it manually

### Installation Failed or Hangs

**Solution:**
1. Make sure you have administrator privileges
2. Temporarily disable antivirus during installation
3. Try downloading again (file might be corrupted)

### npm Install Fails

**Solution:**
1. Check your internet connection
2. Try running Command Prompt as Administrator
3. Delete `node_modules` folder if it exists
4. Run `start.bat` again

### Port 3000 Already in Use

**Solution:**
1. Another application is using port 3000
2. Open `vite.config.js` in the portfolio folder
3. Change the port number (e.g., to 3001)
4. Or close the application using port 3000

---

## What Gets Installed?

When you run `start.bat` for the first time, these packages are installed:

- **vite** - Development server and build tool
- **three** - 3D graphics library
- **gsap** - Animation library
- And other supporting packages (~200MB total)

These are installed in a `node_modules` folder inside the portfolio directory.

---

## System Requirements

- **Operating System:** Windows 10 or later
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** ~500MB for Node.js + dependencies
- **Internet:** Required for initial installation

---

## Alternative: View Without Running Server

If you want to view the portfolio without installing Node.js:

1. You can open `index.html` directly in your browser
2. **However:** Some features won't work:
   - 3D animations may not load
   - Module imports will fail
   - Hot reload won't work

**Recommendation:** Installing Node.js is the best option for full functionality.

---

## Need More Help?

- **Node.js Documentation:** https://nodejs.org/docs/
- **npm Documentation:** https://docs.npmjs.com/
- **Vite Documentation:** https://vitejs.dev/

---

## Quick Reference

```bash
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# Navigate to portfolio (from anywhere)
cd C:\Users\Mascha\Desktop\Comfy_new\portfolio-website

# Install dependencies manually
npm install

# Start development server manually
npm run dev

# Build for production
npm run build
```

---

**✨ Once Node.js is installed, just double-click `start.bat` to launch your portfolio!**