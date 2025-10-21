@echo off
REM Portfolio Website - Quick Start Script
REM Automatically installs dependencies and starts development server
REM
REM IMPORTANT: This file uses Command Prompt (cmd.exe), NOT PowerShell
REM If you're experiencing npm execution policy errors in PowerShell,
REM double-click this .bat file or run it from Command Prompt instead.
REM See POWERSHELL_FIX.md for more details.

echo ================================================
echo   Mascha Portfolio Website - Quick Start
echo ================================================
echo.
echo [NOTE] Running in Command Prompt (cmd.exe)
echo.
echo [INFO] Current Location: %CD%
echo [INFO] Navigating to portfolio directory...
echo.

REM Change to the script's directory (where this .bat file is located)
cd /d "%~dp0"

echo [SUCCESS] Now in: %CD%
echo.

REM Check if Node.js is installed
echo [INFO] Checking for Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ================================================
    echo   [ERROR] Node.js is NOT installed!
    echo ================================================
    echo.
    echo Node.js is required to run this portfolio website.
    echo.
    echo NEXT STEPS:
    echo   1. Read NODE_SETUP.md in this folder for detailed instructions
    echo   2. Install Node.js from: https://nodejs.org/
    echo   3. Download the LTS (Long Term Support) version
    echo   4. After installation, restart this script
    echo.
    echo ================================================
    echo.
    pause
    exit /b 1
)

REM Display Node.js version
echo [INFO] Checking Node.js version...
node --version
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    echo.
    echo This may take a few minutes on first run...
    echo.
    call npm install
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies
        echo.
        echo Try running manually: npm install
        echo.
        pause
        exit /b 1
    )
    
    echo.
    echo [SUCCESS] Dependencies installed successfully!
    echo.
) else (
    echo [INFO] node_modules found. Skipping installation.
    echo.
)

REM Start development server
echo [INFO] Starting development server...
echo.
echo The browser will open automatically at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server when finished.
echo.
echo ================================================
echo.

REM Start npm dev server
call npm run dev

REM If server exits unexpectedly
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Development server exited with error
    echo.
    pause
)