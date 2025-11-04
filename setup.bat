@echo off
echo ========================================
echo   Heart Disease Predictor Setup
echo ========================================
echo.

echo [1/4] Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Training ML Model...
python ml\train_model.py
if errorlevel 1 (
    echo ERROR: Failed to train model
    pause
    exit /b 1
)

echo.
echo [4/4] Setup Complete!
echo.
echo ========================================
echo   Ready to Start!
echo ========================================
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
pause

