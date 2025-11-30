# User Retention Dashboard API

JSON Server API for the User Retention Dashboard.

## Quick Deploy to Render

1. **Create Render Account**
   - Go to [https://render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy as Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: user-retention-api
     Root Directory: api
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Set Environment Variables** (optional)
   - Add `PORT` (Render will set this automatically)

4. **Deploy!**
   - Click "Create Web Service"
   - Your API will be live at: `https://user-retention-api-xxxx.onrender.com`

## Quick Deploy to Railway

1. **Create Railway Account**
   - Go to [https://railway.app](https://railway.app)
   - Sign in with GitHub

2. **Deploy Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the Node.js app

3. **Configure**
   - Set root directory to `api` if needed
   - Railway will auto-deploy on every push

4. **Get URL**
   - Copy your Railway URL from the dashboard

## Local Development

```bash
cd api
npm install
npm start
```

API will run on `http://localhost:5000`

## Endpoints

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /analytics` - Get analytics data

## After Deployment

Update your frontend environment variable:
```
REACT_APP_API_URL=https://your-api-url.onrender.com
```

Then redeploy your Netlify site!
