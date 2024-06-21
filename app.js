const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const { authRoutes, userRoutes, groupRoutes } = require('./routes');
const {
  authenticateToken,
  handle404Error,
  handleGlobalError,
} = require('./middlewares');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(config.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use routes
app.use('/api', authRoutes); // e.g., /api/login, /api/logout
app.use('/api', authenticateToken, userRoutes); // e.g., /api/users
app.use('/api', authenticateToken, groupRoutes); // e.g., /api/groups

// Handle undefined routes (404)
app.use(handle404Error);

// Error handler
app.use(handleGlobalError);

module.exports = app;
