import express from 'express';
import bodyParser from 'body-parser';
import { connectToDB } from './lib/db.js';
import { authRoutes, adminRoutes, groupMessageRoutes, groupRoutes } from './routes/index.js';
import { authenticateToken, handle404Error, handleGlobalError, verifyAdmin } from './middlewares/index.js';


// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectToDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyAdmin, adminRoutes);
app.use('/api/groups', authenticateToken, groupRoutes);
app.use('/api/groups', authenticateToken, groupMessageRoutes);

// Handle undefined routes (404)
app.use(handle404Error);

// Error handler
app.use(handleGlobalError);

export { app };