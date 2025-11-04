# 🔧 Fix GitHub Pages 404 Error

If you're seeing a 404 error when accessing your GitHub Pages site, follow these steps:

---

## ✅ Step-by-Step Fix

### **Step 1: Verify Repository is Public**

GitHub Pages **requires** public repositories on the free tier.

1. Go to: `https://github.com/sssathish1056-ui/Mini-project`
2. Click **"Settings"** tab
3. Scroll to **"Danger Zone"** at the bottom
4. If it says "Change repository visibility" → **Make sure it says "Public"**
5. If it's private, click "Change visibility" and make it **Public**

---

### **Step 2: Enable GitHub Pages (If Not Already Enabled)**

1. Go to: `https://github.com/sssathish1056-ui/Mini-project/settings/pages`
2. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)` or `/docs` (try root first)
3. Click **"Save"**
4. Wait 1-2 minutes

---

### **Step 3: Check GitHub Pages Settings**

1. Go to repository **Settings** → **Pages**
2. Make sure you see:
   - ✅ **"Your site is live at..."** with a green checkmark
   - The URL should be: `https://sssathish1056-ui.github.io/Mini-project/`

---

### **Step 4: Verify index.html is in Root**

Your `index.html` must be in the root directory (which it is). Make sure it's committed:

```bash
git add index.html
git commit -m "Ensure index.html is in root"
git push origin main
```

---

### **Step 5: Add .nojekyll File**

I've created a `.nojekyll` file for you. Make sure it's pushed:

1. The file `.nojekyll` should be in your root directory
2. Push it to GitHub:
   ```bash
   git add .nojekyll
   git commit -m "Add .nojekyll to disable Jekyll"
   git push origin main
   ```

---

### **Step 6: Wait for Deployment**

After making changes:
- ⏱️ Wait **2-5 minutes** for GitHub to rebuild
- 🔄 The site should update automatically

---

## 🔍 Check Deployment Status

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. You should see deployment activity
4. If there are errors, click on the failed workflow to see details

---

## 🚨 Common Issues & Solutions

### **Issue 1: "404 File not found"**

**Solution:**
- Make sure repository is **Public**
- Verify `index.html` is in the root directory
- Wait 5 minutes after enabling Pages
- Clear browser cache (Ctrl+Shift+R)

---

### **Issue 2: Site loads but shows blank page**

**Solution:**
- Check browser console (F12) for JavaScript errors
- Make sure all file paths in `index.html` are correct
- Verify `styles.css` and `script.js` are in root

---

### **Issue 3: "Site not found"**

**Solution:**
- Double-check the URL format: `https://sssathish1056-ui.github.io/Mini-project/`
- Make sure repository name matches exactly: `Mini-project`
- Try accessing: `https://sssathish1056-ui.github.io/Mini-project/index.html`

---

### **Issue 4: Pages shows "Check again later"**

**Solution:**
- Wait 5-10 minutes (first deployment takes longer)
- Check the **Actions** tab for build status
- Try disabling and re-enabling Pages in Settings

---

## 📋 Quick Checklist

Before asking for help, verify:

- [ ] Repository is **Public**
- [ ] GitHub Pages is enabled in Settings
- [ ] Source branch is set to `main`
- [ ] `index.html` is in root directory
- [ ] `.nojekyll` file exists (I created this for you)
- [ ] All files are committed and pushed
- [ ] Waited at least 5 minutes after enabling

---

## 🆘 Still Not Working?

If you've tried everything:

1. **Disable and Re-enable Pages:**
   - Go to Settings → Pages
   - Change source to "None" and Save
   - Wait 1 minute
   - Change back to `main` branch and Save

2. **Check Repository Settings:**
   - Make sure branch is named exactly `main` (not `master`)
   - Verify repository name is exactly `Mini-project`

3. **Try Alternative URL:**
   - `https://sssathish1056-ui.github.io/Mini-project/index.html`

4. **Check GitHub Status:**
   - Visit: https://www.githubstatus.com/
   - Make sure Pages service is operational

---

## 🎯 Expected Result

After following these steps, you should be able to access:
```
https://sssathish1056-ui.github.io/Mini-project/
```

And see your Heart Disease Prediction Web App! ❤️

---

## 📝 Need to Push Changes?

If you haven't pushed the `.nojekyll` file yet, run:

```bash
git add .
git commit -m "Fix GitHub Pages 404 - add .nojekyll file"
git push origin main
```

Then wait 2-3 minutes and try accessing the site again!
