@echo off
echo ========================================
echo  Fixing GitHub Pages Deployment
echo ========================================
echo.

echo Step 1: Adding all files including .nojekyll...
git add .
git add -f .nojekyll

echo.
echo Step 2: Committing changes...
git commit -m "Fix: Add .nojekyll and ensure all files are deployed"

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  Deployment Fix Complete!
echo ========================================
echo.
echo IMPORTANT: Wait 2-3 minutes after pushing
echo Then visit: https://sssathish1056-ui.github.io/project/
echo.
echo If that doesn't work, try: 
echo https://sssathish1056-ui.github.io/Mini-project/
echo.
pause
