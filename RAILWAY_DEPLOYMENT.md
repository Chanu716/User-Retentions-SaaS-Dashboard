# 🚂 Railway Deployment Guide

Complete guide to deploy your User Retention SaaS Dashboard on Railway.

---

## 🎯 What You'll Deploy

1. **Backend API** (JSON Server) - Handles all data operations
2. **Frontend App** (React) - The dashboard interface

Both will be deployed on Railway's free tier! 🎉

---

## 📋 Prerequisites

- ✅ GitHub account with your code pushed
- ✅ Railway account (sign up at [railway.app](https://railway.app))
- ✅ 10 minutes of your time

---

## 🚀 Step-by-Step Deployment

### **PART 1: Deploy Backend API**

#### 1. **Create Railway Account**
- Go to [https://railway.app](https://railway.app)
- Click **"Login"** → **"Login with GitHub"**
- Authorize Railway to access your repositories

#### 2. **Create New Project for Backend**
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose: `User-Retentions-SaaS-Dashboard`
- Railway will detect it's a monorepo

#### 3. **Configure Backend Service**
- Click **"Add Service"** or it may auto-detect
- Click on the service → **"Settings"**
- Set **"Root Directory"**: `api`
- Set **"Start Command"**: `npm start` (should auto-detect)
- Click **"Deploy"**

#### 4. **Generate Public Domain**
- Go to **"Settings"** tab
- Scroll to **"Networking"** section
- Click **"Generate Domain"**
- You'll get a URL like: `https://user-retention-api-production.up.railway.app`
- **📝 COPY THIS URL** - You'll need it for the frontend!

#### 5. **Verify Backend is Working**
- Open your API URL in browser: `https://your-api-url.up.railway.app/users`
- You should see JSON data with all users
- If you see JSON data, backend is live! ✅

---

### **PART 2: Deploy Frontend App**

#### 6. **Create New Project for Frontend**
- Go back to Railway dashboard
- Click **"New Project"** again
- Select **"Deploy from GitHub repo"**
- Choose: `User-Retentions-SaaS-Dashboard` (same repo)

#### 7. **Configure Frontend Service**
- Click on the service → **"Settings"**
- Set **"Root Directory"**: leave empty or set to `/`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

#### 8. **Add Environment Variable**
- In the service settings, go to **"Variables"** tab
- Click **"New Variable"**
- Add:
  ```
  Key: REACT_APP_API_URL
  Value: https://your-backend-url-from-step4.up.railway.app
  ```
- Click **"Add"**

#### 9. **Generate Public Domain for Frontend**
- Go to **"Settings"** tab
- Scroll to **"Networking"**
- Click **"Generate Domain"**
- You'll get: `https://user-retention-dashboard-production.up.railway.app`

#### 10. **Trigger Deployment**
- Go to **"Deployments"** tab
- Click **"Deploy"** or it will auto-deploy
- Wait 3-5 minutes for build to complete

---

## ✅ Verification

### **Test Your Deployment**

1. **Visit Your Frontend URL**
   - `https://your-frontend-url.up.railway.app`
   - Dashboard should load with data

2. **Check Data Loading**
   - Open browser DevTools (F12) → Network tab
   - Refresh the page
   - You should see requests to your Railway API URL
   - Status should be 200 OK

3. **Test CRUD Operations**
   - ✅ Add a new user
   - ✅ Edit a user
   - ✅ Delete a user
   - ✅ Search and filter users

---

## 🎨 Optional: Custom Domains

### **Add Your Own Domain**

1. **In Railway Dashboard**
   - Select your frontend service
   - Go to **"Settings"** → **"Networking"**
   - Click **"Custom Domain"**
   - Enter: `dashboard.yourdomain.com`

2. **Update DNS Records**
   - In your domain registrar, add CNAME:
   ```
   Type: CNAME
   Name: dashboard
   Value: your-app.up.railway.app
   ```

3. **SSL Certificate**
   - Railway automatically provisions SSL
   - Your site will be secure with HTTPS

---

## 🔄 Continuous Deployment

**Already Set Up! ✅**

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin master
```

Railway automatically:
1. Detects the change
2. Rebuilds your app
3. Deploys the new version
4. Updates your live site

---

## 💰 Railway Free Tier

- **$5 Free Credits** per month
- Includes:
  - 500 hours of service uptime
  - 100 GB bandwidth
  - Perfect for small projects

**Pro Tip**: If you run out of free credits, Railway will pause your services until next month or you can upgrade.

---

## 🐛 Troubleshooting

### **Backend Not Deploying?**

**Check Build Logs**
- Go to backend service → "Deployments" → Click on latest deployment
- Look for errors in build logs

**Common Issues:**
- Missing `package.json` in `api` folder → Check root directory is set to `api`
- Port configuration → Railway auto-sets `PORT` env variable, our code handles it

**Fix:**
```bash
# Ensure api/package.json has correct start script
"scripts": {
  "start": "node server.js"
}
```

### **Frontend Shows Errors?**

**CORS Issues**
- Verify `REACT_APP_API_URL` is set correctly in frontend variables
- Check it matches your backend URL exactly (no trailing slash)

**Build Failures**
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`

**Data Not Loading**
- Open DevTools → Console
- Check for API request errors
- Verify backend URL is responding: `https://your-api-url.up.railway.app/users`

### **Environment Variable Not Working?**

- Must be exactly: `REACT_APP_API_URL`
- Must redeploy after adding/changing variables
- Clear browser cache after redeployment

---

## 📊 Monitoring Your Apps

### **Railway Dashboard**

**Metrics Available:**
- CPU usage
- Memory usage
- Network traffic
- Request logs
- Build logs
- Deployment history

**Access Logs:**
1. Select your service
2. Click **"Deployments"** tab
3. Click on any deployment to see logs
4. Real-time logs show as your app runs

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Always use Railway's variable system
   - Keep API keys secure

2. **CORS Configuration**
   - Already configured in `api/server.js`
   - Allows all origins for development
   - For production, restrict to your frontend domain:
   ```javascript
   origin: 'https://your-frontend.up.railway.app'
   ```

3. **Rate Limiting** (Optional Enhancement)
   - Add rate limiting to API to prevent abuse
   - Use `express-rate-limit` package

---

## 📱 Quick Reference Commands

```bash
# Local development
npm install
npm start

# API local testing
cd api
npm install
npm start

# Deploy changes
git add .
git commit -m "Update description"
git push origin master
# Railway auto-deploys!

# View live sites
Frontend: https://your-frontend.up.railway.app
Backend: https://your-backend.up.railway.app/users
```

---

## 🎯 Post-Deployment Checklist

After deploying, verify:

- [x] Backend API responds at `/users` endpoint
- [x] Backend API responds at `/analytics` endpoint
- [x] Frontend loads without errors
- [x] Dashboard displays user data
- [x] Charts render correctly
- [x] Add user functionality works
- [x] Edit user functionality works
- [x] Delete user functionality works
- [x] Search and filters work
- [x] No CORS errors in console
- [x] No 404 errors in network tab

---

## 🌟 Pro Tips

1. **Faster Deployments**
   - Railway caches dependencies
   - First deploy: ~3-5 minutes
   - Subsequent deploys: ~1-2 minutes

2. **Multiple Environments**
   - Create separate projects for staging/production
   - Use different branches (staging/master)

3. **Collaborate**
   - Invite team members in Railway dashboard
   - Share project access
   - Team can view logs and metrics

4. **Database Upgrade** (Future)
   - When ready for real database, Railway offers:
     - PostgreSQL
     - MySQL
     - MongoDB
     - Redis

---

## 🆘 Need Help?

- **Railway Docs**: [https://docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [https://discord.gg/railway](https://discord.gg/railway)
- **Project Issues**: [GitHub Issues](https://github.com/Chanu716/User-Retentions-SaaS-Dashboard/issues)

---

## 🎉 Success!

Your User Retention Dashboard is now live on Railway!

**Share your deployment:**
- Frontend: `https://your-frontend.up.railway.app`
- Add to your portfolio
- Share on LinkedIn/Twitter
- Include in your resume

---

**Deployed with ❤️ on Railway** | **Last Updated: December 1, 2025**
