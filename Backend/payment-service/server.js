require('./config/env');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require('morgan');
const paymentRoutes = require('./routes/payment.routes');
const { handleWebhook } = require('./webhooks/razorpay.webhook');
const { connectDB } = require("./config/db");


dotenv.config();
const app = express();


// Connect PostgreSQL
connectDB();

app.post('/api/v1/payments/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Health Check (important for microservices)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP',
        service: 'Payment Service',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/v1/payments', paymentRoutes);

// Global Error Handler (catches errors from controllers/services)
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message);
    res.status(500).json({ 
        message: 'Internal Server Error', 
        error: err.message 
    });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
