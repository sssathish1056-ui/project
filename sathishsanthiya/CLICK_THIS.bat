@echo off
title Heart Disease Predictor Server
color 0A
cls

echo.
echo ===============================================================
echo   🩺 HEART DISEASE PREDICTOR - STARTING...
echo ===============================================================
echo.

REM Try Python first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found!
    echo.
    echo 🚀 Starting server...
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║   👉 OPEN THIS LINK IN YOUR BROWSER:                 ║
    echo ║   👉 http://localhost:8000/index.html                 ║
    echo ║                                                         ║
    echo ║   ⚠️  KEEP THIS WINDOW OPEN                            ║
    echo ║   Press Ctrl+C to stop the server                     ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    python start_server.py
) else (
    echo ❌ Python not found!
    echo.
    echo Try opening index.html directly:
    echo 1. Find index.html in this folder
    echo 2. Double-click it to open in browser
    echo.
    echo OR install Python from: https://www.python.org/downloads/
    echo.
    pause
)

