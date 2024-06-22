const express = require('express');
const connectDB = require('./lib/db');
const bodyParser = require('body-parser');
const { authRoutes, adminRoutes, userRoutes, groupRoutes } = require('./routes');
const { authenticateToken, handle404Error, handleGlobalError } = require('./middlewares');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/auth', authRoutes); // e.g., /api/login, /api/logout
app.use('/api/admin', adminRoutes); // e.g., /api/admin/createUser, /api/admin/user/123

// app.use('/api', authenticateToken, userRoutes); // e.g., /api/users
// app.use('/api', authenticateToken, groupRoutes); // e.g., /api/groups

// Handle undefined routes (404)
app.use(handle404Error);

// Error handler
app.use(handleGlobalError);

module.exports = app;