# PowerShell Execution Policy Error - Fix Guide

## 🔴 The Error You're Seeing

If you tried to run `npm install` or `npm run dev` in **PowerShell** and got this error:

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
```

**Don't worry! This is a Windows security feature, not a real problem.** There are two simple solutions.

---

## ✅ Solution 1: Use Command Prompt Instead (EASIEST)

**This is the recommended and fastest solution.** PowerShell has strict security policies, but Command Prompt (cmd.exe) doesn't have this issue.

### Option A: Double-Click start.bat

1. **Navigate to your portfolio folder:**
   ```
   C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
   ```

2. **Double-click `start.bat`**
   - The script automatically uses Command Prompt (cmd.exe)
   - It will install dependencies and start the server
   - No PowerShell issues!

### Option B: Use Command Prompt Directly

1. **Open Command Prompt:**
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - ✅ You should see a black window that says "Command Prompt" at the top

2. **Navigate to your portfolio folder:**
   ```cmd
   cd C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
   ```

3. **Install dependencies (first time only):**
   ```cmd
   npm install
   ```

4. **Start the development server:**
   ```cmd
   npm run dev
   ```

5. **Your portfolio will open at:** `http://localhost:3000`

### How to Tell Which Terminal You're Using

- **Command Prompt (cmd.exe)** ✅
  - Window title: "Command Prompt" or "Administrator: Command Prompt"
  - Prompt looks like: `C:\Users\Mascha>`
  - **This one works without issues**

- **PowerShell** ⚠️
  - Window title: "Windows PowerShell" or "PowerShell"
  - Prompt looks like: `PS C:\Users\Mascha>`
  - **This one has execution policy restrictions**

---

## ✅ Solution 2: Fix PowerShell Execution Policy (ADVANCED)

If you prefer to use PowerShell, you can change its execution policy. **This requires administrator privileges.**

### Step-by-Step Instructions

1. **Open PowerShell as Administrator:**
   - Press `Windows Key`
   - Type `PowerShell`
   - **Right-click** on "Windows PowerShell"
   - Select **"Run as administrator"**
   - Click **Yes** when prompted for permission

2. **Run this command:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Confirm when prompted:**
   - Type `Y` and press Enter

4. **Verify the change:**
   ```powershell
   Get-ExecutionPolicy -List
   ```
   - You should see `CurrentUser` set to `RemoteSigned`

5. **Close and reopen PowerShell** (as normal user, not admin)

6. **Now you can use npm commands:**
   ```powershell
   cd C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
   npm install
   npm run dev
   ```

### What This Command Does

- **`Set-ExecutionPolicy`**: Changes PowerShell's script execution rules
- **`RemoteSigned`**: Allows locally created scripts to run (like npm)
- **`Scope CurrentUser`**: Only affects your user account, not system-wide

This is a **safe** change and is recommended even by Microsoft for development work.

---

## 🤔 Why Does This Happen?

### Windows Security Feature

PowerShell has **Execution Policies** to prevent malicious scripts from running automatically. By default, Windows blocks all PowerShell scripts for security.

### Why npm Triggers This

When you run `npm` commands:
1. npm uses PowerShell scripts (`.ps1` files) to run
2. Windows sees these scripts and blocks them
3. You get the execution policy error

### Why Command Prompt Works

- Command Prompt (cmd.exe) uses batch files (`.bat` and `.cmd`)
- Batch files don't have the same security restrictions
- npm commands work without any configuration

---

## 📋 Quick Reference

### Using Command Prompt (Recommended)

```cmd
REM Open Command Prompt (not PowerShell!)
Win+R → type "cmd" → Enter

REM Navigate to portfolio
cd C:\Users\Mascha\Desktop\Comfy_new\portfolio-website

REM Install and run
npm install
npm run dev
```

### Using start.bat (Easiest)

```
1. Navigate to: C:\Users\Mascha\Desktop\Comfy_new\portfolio-website
2. Double-click: start.bat
3. Wait for browser to open
```

### Fixing PowerShell (One-Time Setup)

```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Type 'Y' and press Enter when prompted
```

---

## 🆘 Still Having Issues?

### Error: "npm: command not found" or "npm is not recognized"

**This means Node.js isn't installed or isn't in your PATH.**

**Solution:**
1. See [`NODE_SETUP.md`](NODE_SETUP.md) for Node.js installation
2. After installing Node.js, **restart your terminal**
3. Verify with: `node --version` and `npm --version`

### Error: "EACCES" or "Permission denied"

**Solution:**
1. Close VSCode or any terminals
2. Run Command Prompt as Administrator
3. Navigate to portfolio folder
4. Run `npm install` again

### Error: "Port 3000 already in use"

**Solution:**
1. Another program is using port 3000
2. Close other development servers
3. Or change the port in `vite.config.js`

---

## 🎯 Recommended Setup for Development

For the best experience with your portfolio:

1. **Always use Command Prompt (cmd.exe)** for npm commands
   - Or simply double-click `start.bat`
   
2. **Keep PowerShell for other tasks**
   - PowerShell is great for system administration
   - But Command Prompt is better for npm

3. **Consider using VSCode's integrated terminal**
   - VSCode can be configured to use cmd.exe by default
   - Go to Settings → Terminal → Default Profile → Command Prompt

---

## 📚 Additional Resources

- [About Execution Policies (Microsoft)](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [Node.js Installation Guide](NODE_SETUP.md)
- [npm Documentation](https://docs.npmjs.com/)

---

## ✨ Summary

**If you see PowerShell execution policy errors:**

1. ✅ **EASIEST:** Just use Command Prompt instead (open with `cmd`)
2. ✅ **OR:** Double-click `start.bat` (it uses cmd automatically)
3. ⚠️ **ADVANCED:** Fix PowerShell policy (requires admin privileges)

**You should never need to worry about this again if you use Command Prompt or start.bat!**