# 🚀 Deployment Guide - User Retention SaaS Dashboard

This guide will help you deploy your User Retention Dashboard to production.

---

## 📦 Netlify Deployment (Recommended)

### **Quick Deploy from GitHub**

#### **Step 1: Prepare Your Repository**
Your code is already pushed to GitHub! ✅
- Repository: `https://github.com/Chanu716/User-Retentions-SaaS-Dashboard`

#### **Step 2: Connect to Netlify**

1. **Sign in to Netlify**
   - Go to [https://netlify.com](https://netlify.com)
   - Click **"Sign up"** or **"Log in"**
   - Sign in with your GitHub account

2. **Import Project**
   - Click **"Add new site"** → **"Import an existing project"**
   - Select **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub repositories
   - Search for and select: `User-Retentions-SaaS-Dashboard`

3. **Configure Build Settings**
   Netlify will auto-detect settings from `netlify.toml`:
   ```
   Build command: npm run build
   Publish directory: build
   Node version: 18
   ```
   
   **No need to change anything!** Just click **"Deploy site"**

4. **Wait for Deployment**
   - Build time: ~2-3 minutes
   - Watch the build logs in real-time
   - Once complete, you'll get a live URL!

5. **Your Dashboard is Live! 🎉**
   - URL format: `https://random-name-12345.netlify.app`
   - Click **"Site settings"** → **"Change site name"** to customize

---

## 🔧 Post-Deployment Configuration

### **Update API Base URL**

Since JSON Server needs to run separately, you have two options:

#### **Option 1: Deploy JSON Server to Railway (Free)**

1. **Go to Railway**
   - Visit [https://railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Empty Project"**

3. **Add JSON Server**
   - Click **"+ New"** → **"Empty Service"**
   - In Settings, add build command:
     ```bash
     npm install -g json-server
     json-server --watch db.json --port $PORT --host 0.0.0.0
     ```
   
4. **Upload db.json**
   - Copy your `db.json` file content
   - Create file in Railway dashboard
   - Get your Railway URL (e.g., `https://your-app.railway.app`)

5. **Update Frontend API URL**
   - Edit `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-app.railway.app';
   ```
   - Commit and push:
   ```bash
   git add src/services/api.js
   git commit -m "Update API URL for production"
   git push origin master
   ```
   - Netlify will auto-redeploy!

#### **Option 2: Use Mock Data (Demo Mode)**
   
Keep localhost:5000 in code for demo purposes. Users will need to run JSON Server locally.

---

## 🌐 Custom Domain Setup

### **Add Your Own Domain**

1. **In Netlify Dashboard**
   - Go to **"Domain settings"**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `dashboard.yourdomain.com`)

2. **Update DNS Records**
   - Add CNAME record in your domain registrar:
   ```
   Type: CNAME
   Name: dashboard (or @ for root)
   Value: your-site-name.netlify.app
   ```

3. **Enable HTTPS**
   - Netlify automatically provisions SSL certificate
   - Your site will be secure with `https://`

---

## 🔄 Continuous Deployment

**Already Configured! ✅**

Every time you push to GitHub:
1. Netlify detects the change
2. Automatically builds your app
3. Deploys the new version
4. Updates your live site

```bash
# Make changes
git add .
git commit -m "Your update message"
git push origin master
# Netlify auto-deploys in ~2 minutes!
```

---

## 📊 Monitor Your Deployment

### **Netlify Dashboard**
- **Build logs**: See build output and errors
- **Deploy history**: Rollback to previous versions
- **Analytics**: Track site traffic (requires upgrade)
- **Forms**: Capture user submissions
- **Functions**: Add serverless functions

---

## 🐛 Troubleshooting

### **Build Failed?**

**Check Node Version**
- Ensure `netlify.toml` specifies Node 18
- Update if needed:
```toml
[build.environment]
  NODE_VERSION = "18"
```

**Missing Dependencies**
- Run locally to verify:
```bash
npm install
npm run build
```

**Clear Cache**
- In Netlify: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### **Routing Not Working?**

**Ensure _redirects file exists**
- Check `public/_redirects` contains:
```
/*    /index.html   200
```

### **Blank Page After Deploy?**

**Check Console Errors**
- Open browser DevTools (F12)
- Look for API errors
- Update API_BASE_URL if needed

---

## 🎯 Alternative Deployment Options

### **Vercel**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### **GitHub Pages** (Requires configuration)
```bash
npm install gh-pages --save-dev
npm run build
npm run deploy
```

### **Docker + Cloud Run**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
```

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [x] All code pushed to GitHub
- [x] `netlify.toml` configured
- [x] `_redirects` file in public folder
- [x] `.gitignore` excludes node_modules and build
- [x] Package.json has correct build script
- [x] Environment variables updated for production
- [x] API endpoints configured correctly
- [x] Build runs successfully locally

---

## 📧 Need Help?

- **Netlify Docs**: [https://docs.netlify.com](https://docs.netlify.com)
- **Railway Docs**: [https://docs.railway.app](https://docs.railway.app)
- **Issues**: [GitHub Issues](https://github.com/Chanu716/User-Retentions-SaaS-Dashboard/issues)

---

**🎉 Congratulations! Your dashboard is now live and accessible worldwide!**

**Share your deployed URL:**
- Twitter: "Just deployed my User Retention Dashboard! 🚀"
- LinkedIn: Showcase your project
- Portfolio: Add to your work samples

---

**Made with ❤️ by Chanu716** | **Deploy timestamp: December 1, 2025**
