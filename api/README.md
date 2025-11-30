# User Retention Dashboard API

JSON Server API for the User Retention Dashboard.

## Quick Deploy to Railway (Recommended)

1. **Sign in to Railway**
   - Go to [https://railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select: `User-Retentions-SaaS-Dashboard`

3. **Configure Service**
   - Click on the service → **"Settings"**
   - Set **"Root Directory"**: `api`
   - Railway auto-detects Node.js and runs `npm start`

4. **Generate Domain**
   - Go to **"Settings"** → **"Networking"**
   - Click **"Generate Domain"**
   - Copy your URL: `https://your-api.up.railway.app`

5. **Verify Deployment**
   - Visit: `https://your-api.up.railway.app/users`
   - Should return JSON data

## Alternative: Deploy to Render

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

3. **Deploy!**
   - Click "Create Web Service"
   - Your API will be live at: `https://user-retention-api-xxxx.onrender.com`

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
- `PATCH /users/:id` - Partial update user
- `DELETE /users/:id` - Delete user
- `GET /analytics` - Get analytics data

## Environment Variables

- `PORT` - Server port (default: 5000, Railway sets this automatically)

## After Deployment

Update your frontend environment variable:
```
REACT_APP_API_URL=https://your-api-url.up.railway.app
```

Then redeploy your frontend!

## CORS Configuration

The API is configured to accept requests from any origin. For production, you may want to restrict this in `server.js`:

```javascript
server.use(cors({
  origin: 'https://your-frontend-domain.up.railway.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```
