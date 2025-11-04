@echo off
echo Setting up GitHub remote and pushing code...
echo.

echo Checking/Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/sssathish1056-ui/Mini-project.git

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Adding all files to git...
git add .

echo.
echo Committing all changes...
git commit -m "Initial commit: Add all project files"

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Your code has been pushed to GitHub.
pause
