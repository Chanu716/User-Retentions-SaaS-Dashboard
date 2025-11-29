const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(cookieParser());

// Database Connection
// For local dev: attempt to connect to MongoDB and retry on failure.
const connectDB = async () => {
    const opts = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        family: 4
    };

    const tryConnect = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, opts);
            console.log('MongoDB Connected');
        } catch (err) {
            console.error('MongoDB Connection Error (will retry):', err.message || err);
            // Retry after delay
            setTimeout(tryConnect, 5000);
        }
    };

    tryConnect();
};

// Start server immediately so dev work isn't blocked by DB startup issues
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle connection errors after initial connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// When DB opens, ensure legacy env key is copied to DB for backward compatibility
mongoose.connection.once('open', async () => {
    console.log('MongoDB connection open - ensuring legacy ingest key exists in DB');
    try {
        const ApiKey = require('./models/ApiKey');
        const crypto = require('crypto');
        const raw = process.env.INGEST_API_KEY;
        if (raw) {
            const hash = crypto.createHash('sha256').update(raw).digest('hex');
            // If a key with this hash doesn't exist, create a legacy entry
            const existing = await ApiKey.findOne({ hash });
            if (!existing) {
                const keyId = 'legacy-' + crypto.randomBytes(6).toString('hex');
                await ApiKey.create({ name: 'legacy-ingest-key', keyId, hash, scopes: ['ingest:events'] });
                console.log('Inserted legacy INGEST_API_KEY into ApiKey collection');
            }
        }
        // Ensure there is at least one admin user for local development
        try {
            const User = require('./models/User');
            const adminExists = await User.findOne({ role: 'admin' });
            if (!adminExists) {
                const adminCode = process.env.ADMIN_REGISTRATION_CODE;
                if (adminCode) {
                    const bcrypt = require('bcryptjs');
                    const pw = 'password';
                    const hash = await bcrypt.hash(pw, 10);
                    const adminUser = await User.create({ name: 'Local Admin', email: 'admin@local.test', password: hash, role: 'admin' });
                    console.log('Created local admin account: admin@local.test (password: password)');
                } else {
                    console.log('No admin found and ADMIN_REGISTRATION_CODE not set; skip creating local admin');
                }
            }
        } catch (err) {
            console.error('Error ensuring admin user:', err);
        }
    } catch (err) {
        console.error('Error ensuring legacy API key:', err);
    }
});

// Routes
const fs = require('fs');
const path = require('path');
// Helper to conditionally mount routes if the file exists
const tryMount = (routePath, mountPoint) => {
    const fullPath = path.join(__dirname, routePath);
    if (fs.existsSync(fullPath + '.js')) {
        app.use(mountPoint, require(fullPath));
        console.log(`Mounted ${mountPoint} -> ${routePath}`);
    } else {
        console.log(`Skipping missing route file: ${routePath}.js`);
    }
};

// Mount api key management routes
tryMount('./routes/apiKeyRoutes', '/api/apikeys');

tryMount('./routes/authRoutes', '/api/auth');
tryMount('./routes/userRoutes', '/api/user');
tryMount('./routes/adminRoutes', '/api/admin');
tryMount('./routes/usageRoutes', '/api/usage');
tryMount('./routes/metricsRoutes', '/api/metrics');
tryMount('./routes/debugRoutes', '/api/debug');

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Connect to database and start server
connectDB();
