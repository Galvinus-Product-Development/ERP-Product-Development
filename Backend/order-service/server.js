require('./config/env');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require('morgan');
const orderRoutes = require('./routes/orderRoutes');
const { connectDB } = require("./config/db");


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect PostgreSQL
connectDB();



// Health Check (important for microservices)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP',
        service: 'Cart Service',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/v1/orders', orderRoutes);
// 404 Handler
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

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
