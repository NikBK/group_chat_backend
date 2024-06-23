const express = require('express');
const connectDB = require('./lib/db');
const bodyParser = require('body-parser');
const { authRoutes, adminRoutes, groupMessageRoutes, groupRoutes } = require('./routes');
const { authenticateToken, handle404Error, handleGlobalError, verifyAdmin } = require('./middlewares');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/auth', authRoutes); // e.g., /api/login, /api/logout
app.use('/api/admin', verifyAdmin, adminRoutes); // e.g., /api/admin/createUser, /api/admin/user/123
app.use('/api/groups', authenticateToken, groupRoutes);
app.use('/api/groups', authenticateToken, groupMessageRoutes);

// Handle undefined routes (404)
app.use(handle404Error);

// Error handler
app.use(handleGlobalError);

module.exports = app;