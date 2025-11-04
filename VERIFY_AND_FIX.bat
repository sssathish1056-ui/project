@echo off
echo ========================================
echo  Verifying Repository Structure
echo ========================================
echo.

echo Checking if index.html exists in root...
if exist index.html (
    echo [OK] index.html found in root directory
) else (
    echo [ERROR] index.html NOT found in root!
    echo Make sure index.html is in the repository root.
    pause
    exit /b 1
)

echo.
echo Checking if .nojekyll exists...
if exist .nojekyll (
    echo [OK] .nojekyll found
) else (
    echo [WARNING] .nojekyll not found - creating it...
    echo. > .nojekyll
    git add .nojekyll
)

echo.
echo ========================================
echo  Current Status:
echo ========================================
git status

echo.
echo ========================================
echo  IMPORTANT: Check Your GitHub Repository
echo ========================================
echo.
echo 1. Go to: https://github.com/sssathish1056-ui/project
echo 2. Make sure index.html is in the ROOT, not in a subfolder
echo 3. If files are in 'sathishsanthiya' folder, move them to root
echo.
echo ========================================
echo  To Fix Structure Issues:
echo ========================================
echo.
echo If index.html is in a subfolder on GitHub:
echo 1. On GitHub, click on the subfolder
echo 2. Download all files OR
echo 3. Move files to root using GitHub web interface
echo.
pause
