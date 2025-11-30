# 🚀 User Retention SaaS Dashboard

A modern, feature-rich **User Retention Analytics Dashboard** built with React, featuring a stunning dark glassmorphic theme with gold and orange accents. This full-stack CRUD application helps businesses track, analyze, and optimize user retention metrics with beautiful data visualizations.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-61dafb) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Key Features

### 📊 **Comprehensive Dashboard Analytics**
- **5 Interactive Charts** powered by Recharts:
  - 📈 **Revenue Growth Area Chart** - Track monthly revenue trends with gradient visualization
  - 📉 **User Growth Line Chart** - Monitor user acquisition and retention rates
  - 🥧 **Subscription Plans Pie Chart** - Visualize plan distribution (Basic/Premium/Enterprise)
  - 📊 **Churn Risk Bar Chart** - Analyze user risk levels (Low/Medium/High) with color coding
  - 📊 **User Engagement Overview** - Top 8 performers ranked by retention score
- **Real-time Metrics Cards**:
  - Total Users count with percentage growth
  - Active Users tracking
  - Inactive Users monitoring
  - Total Revenue with trend indicators
- **Recent Users Table** - Quick access to latest 5 user profiles

### 👥 **Full CRUD User Management**
- ✅ **Create** - Add new users with comprehensive form validation
- 📖 **Read** - View all users in a responsive grid layout with beautiful cards
- ✏️ **Update** - Edit user profiles with pre-filled forms
- 🗑️ **Delete** - Remove users with confirmation modal for safety
- 🔍 **Advanced Search & Filter**:
  - Search by name or email
  - Filter by status (Active/Inactive)
  - Filter by subscription plan (Basic/Premium/Enterprise)
  - Real-time filtering with instant results

### 📈 **Analytics & Insights**
- **User Distribution Charts**:
  - Subscription plan breakdown
  - User status distribution
  - Churn risk analysis
  - Engagement level metrics
- **Retention Metrics**:
  - Retention scores (0-100%)
  - Lifetime value (LTV) tracking
  - Average session duration
  - Total sessions per user

### ⚙️ **Settings & Customization**
- Dashboard name customization
- Time zone configuration
- Auto-refresh data toggle
- Email notifications control
- Churn alert preferences
- Weekly digest settings
- Data export capabilities
- Export format selection

### 🎨 **Beautiful UI/UX**
- **Dark Glassmorphic Theme** with backdrop blur effects
- **Color Palette**: Deep black (#0a0a0a), Gold (#FFD700), Orange (#FF8C00)
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations**:
  - Fade-in effects on page load
  - Slide-up animations for cards
  - Hover effects with scale transformations
  - Gradient borders on glass components
- **Custom Scrollbar** - Styled with gold accent
- **React Icons** - 30+ beautiful icons throughout the UI
- **Toast Notifications** - Real-time feedback for all actions

---

## 🛠️ Technology Stack

### **Frontend**
- **[React 18.2.0](https://react.dev/)** - Modern UI library with hooks
- **[React Router DOM 7.9.6](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS 3.4.18](https://tailwindcss.com/)** - Utility-first CSS framework with custom theme
- **[Recharts](https://recharts.org/)** - Beautiful, responsive charts and data visualizations
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - 30+ icon sets
- **[React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** - Elegant notifications

### **Backend & API**
- **[Axios 1.13.2](https://axios-http.com/)** - Promise-based HTTP client
- **[JSON Server 1.0.0-beta.3](https://github.com/typicode/json-server)** - Full fake REST API
  - CRUD endpoints for users
  - Analytics data endpoint
  - Runs on `http://localhost:5000`

### **Build Tools**
- **[Create React App 5.0.1](https://create-react-app.dev/)** - Zero-config setup
- **[PostCSS](https://postcss.org/)** - CSS transformations
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Vendor prefixes

### **Development**
- **ES6+ JavaScript** - Modern syntax with arrow functions, destructuring, async/await
- **React Hooks** - useState, useEffect, useNavigate
- **Custom CSS** - Glassmorphic effects, animations, gradients

---

## 📁 Project Structure

```
SaaS/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
```
SaaS/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Page header with title & search
│   │   └── Sidebar.jsx         # Navigation sidebar (desktop & mobile)
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with 5 charts
│   │   ├── UsersList.jsx       # User grid with CRUD operations
│   │   ├── AddUser.jsx         # Create new user form
│   │   ├── EditUser.jsx        # Edit existing user form
│   │   ├── Analytics.jsx       # Advanced analytics page
│   │   └── Settings.jsx        # Preferences & configuration
│   ├── services/
│   │   └── api.js              # Axios API service layer
│   ├── App.js                  # Root component with routing
│   ├── index.js                # React entry point
│   └── index.css               # Custom CSS + Tailwind directives
├── api/
│   ├── server.js               # JSON Server with CORS
│   ├── db.json                 # Mock database (12 users + analytics)
│   ├── package.json            # API dependencies
│   └── railway.json            # Railway configuration
├── tailwind.config.js          # Tailwind custom theme
├── postcss.config.js           # PostCSS configuration
├── package.json                # Frontend dependencies & scripts
├── railway.json                # Railway deployment config
└── README.md                   # This file

```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 14+ installed
- npm or yarn package manager
- Git (optional, for cloning)

### **Installation**

1. **Navigate to project directory**
   ```bash
   cd SaaS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   # Terminal 1 - Start JSON Server (port 5000)
   cd api
   npm install
   npm start

   # Terminal 2 - Start React App (port 3000)
   cd ..
   npm start
   ```

4. **Open in browser**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:5000`

---

## 🎯 Usage Guide

### **Dashboard**
- View real-time metrics in stat cards at the top
- Explore 5 interactive charts showing different retention aspects
- Check recent users table for latest activity
- All charts are responsive and update with data changes

### **Users Management**
- **View All Users**: Navigate to Users page to see grid of user cards
- **Search**: Use search bar to filter by name or email
- **Filter**: Apply filters for status (Active/Inactive) and subscription plan
- **Add New User**: Click "Add User" button, fill form with validation
- **Edit User**: Click edit icon on user card, modify fields, save changes
- **Delete User**: Click delete icon, confirm in modal dialog

### **Analytics**
- View distribution charts for subscriptions, status, churn risk
- Analyze engagement levels across user base
- Track retention trends over time

### **Settings**
- Customize dashboard name and appearance
- Configure time zone for accurate timestamps
- Enable/disable email notifications
- Set up churn alerts for high-risk users
- Configure data export preferences

---

## 🎨 Theme & Styling

### **Color Palette**
- **Background**: `#0a0a0a` (Deep black)
- **Card Background**: `#1a1a1a` (Dark gray)
- **Accent Yellow**: `#FFD700` (Gold)
- **Accent Orange**: `#FF8C00` (Dark orange)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#9CA3AF` (Gray)

### **Glassmorphic Effects**
- `backdrop-filter: blur(12px)` - Frosted glass effect
- `background: rgba(26, 26, 26, 0.7)` - Semi-transparent cards
- `border: 1px solid rgba(255, 215, 0, 0.2)` - Subtle gold borders
- Gradient overlays on hover states

### **Custom Animations**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## 📊 API Endpoints

### **Base URL**: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Fetch all users |
| GET | `/users/:id` | Fetch single user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user by ID |
| PATCH | `/users/:id` | Partial update user |
| DELETE | `/users/:id` | Delete user by ID |
| GET | `/analytics` | Fetch analytics summary |

### **Sample User Object**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "subscriptionPlan": "Premium",
  "status": "Active",
  "joinDate": "2024-01-15",
  "lastActive": "2024-11-25",
  "totalSessions": 156,
  "averageSessionDuration": "25 min",
  "retentionScore": 87,
  "lifetimeValue": 4500,
  "churnRisk": "Low",
  "engagement": "High"
}
```

---

## 🔧 Available Scripts

```bash
# Start React development server (port 3000)
npm start

# Build production-optimized bundle
npm run build

# Run tests
npm test

```bash
# Start React development server (port 3000)
npm start

# Build production-optimized bundle
npm run build

# Run tests
npm test

# Start JSON Server API (port 5000)
cd api
npm start
```

---

## 🐛 Troubleshooting

### **Port Already in Use**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### **Charts Not Displaying**
- Ensure JSON Server is running (cd api && npm start)
- Check browser console for API errors
- Verify `api/db.json` has user data (should have 12 users)
- Clear browser cache and reload

### **Styling Issues**
- Run `npm install` to ensure Tailwind is properly installed
- Check `tailwind.config.js` for custom theme configuration
- Verify `index.css` imports Tailwind directives

### **Build Errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

---

## 📝 Form Validation Rules

### **Add/Edit User Form**
- ✅ **Name**: Required, min 2 characters
- ✅ **Email**: Required, valid email format (user@domain.com)
- ✅ **Retention Score**: Number between 0-100
- ✅ **Lifetime Value**: Non-negative number
- ✅ **Join Date**: Valid date, not in future
- ✅ **Subscription Plan**: Basic / Premium / Enterprise
- ✅ **Status**: Active / Inactive
- ✅ **Churn Risk**: Low / Medium / High
- ✅ **Engagement**: Low / Medium / High

---

## 🚀 Deployment

## 🚀 Deployment

### **Railway** (Recommended - One Platform for Everything)

Deploy both frontend and backend on Railway with automatic CI/CD!

#### **Quick Deploy Steps:**

1. **Sign up at [Railway](https://railway.app)** with GitHub

2. **Deploy Backend API**
   - Create new project → Deploy from GitHub
   - Select repository: `User-Retentions-SaaS-Dashboard`
   - Set root directory: `api`
   - Generate domain and copy URL

3. **Deploy Frontend**
   - Create another project → Deploy from GitHub  
   - Same repository: `User-Retentions-SaaS-Dashboard`
   - Add environment variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.up.railway.app
     ```
   - Generate domain

4. **Done!** Both services auto-deploy on every git push 🎉

**📚 Detailed Guide**: See `RAILWAY_DEPLOYMENT.md` for complete step-by-step instructions

#### **Why Railway?**
- ✅ **Free Tier**: $5 credit monthly (enough for small projects)
- ✅ **Automatic Deployments**: Push to GitHub = instant deploy
- ✅ **Easy Monorepo Support**: Deploy multiple services from one repo
- ✅ **Built-in Monitoring**: CPU, memory, and network metrics
- ✅ **Custom Domains**: Add your own domain with free SSL
- ✅ **Environment Variables**: Secure config management

### **Alternative Platforms**

**Vercel** (Frontend only)
- Best for static sites and serverless functions
- Deploy: Push to GitHub → Import in Vercel
- API: Deploy separately on Railway/Render

**Render** (Backend API)
- Alternative for JSON Server
- Free tier available
- Good for microservices

### **Production Build**
```bash
npm run build
# Creates optimized bundle in 'build' folder
# Minified, tree-shaken, ready for production
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Recharts** - For beautiful and responsive chart components
- **JSON Server** - For quick and easy mock REST API
- **React Icons** - For comprehensive icon library
- **React Toastify** - For elegant toast notifications

---

## 📧 Contact & Support

- **GitHub**: [@Chanu716](https://github.com/Chanu716)
- **Repository**: [User-Retentions-SaaS-Dashboard](https://github.com/Chanu716/User-Retentions-SaaS-Dashboard)
- **Issues**: [Report bugs or request features](https://github.com/Chanu716/User-Retentions-SaaS-Dashboard/issues)

---

## 🎉 Features Roadmap

- [ ] User authentication & authorization
- [ ] Real-time data updates via WebSocket
- [ ] Export data to CSV/PDF
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering & sorting
- [ ] Bulk user operations
- [ ] Email integration for alerts
- [ ] Multi-language support
- [ ] Custom dashboard widgets
- [ ] API rate limiting

---

**Made with ❤️ by Chanu716** | **Star ⭐ this repo if you find it helpful!**
