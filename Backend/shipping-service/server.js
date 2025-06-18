require('./config/env');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require('morgan');
const shipmentRoutes = require('./routes/shipping.routes');
//const webhookRoutes = require('./routes/webhook.routes');
const { connectDB } = require("./config/db");


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect PostgreSQL
connectDB();

// Mount the shipping routes under /api/v1
app.use('/api/v1/shipping', shipmentRoutes);
//app.use('/api/v1/webhook', webhookRoutes);

// Health Check (important for microservices)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP',
        service: 'Shipping Service',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

// Global Error Handler (catches errors from controllers/services)
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message);
    res.status(500).json({ 
        message: 'Internal Server Error', 
        error: err.message 
    });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Shipping Service running on port ${PORT}`));
