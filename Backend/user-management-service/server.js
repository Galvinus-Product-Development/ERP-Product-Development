const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');  
const path = require('path');  
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('./config/sessionStore');
const startServer = require('./graphql'); 
const authRoutes = require('./routes/authRoutes');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize the app
const app = express();

// Create a write stream (in append mode) for logging to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// Middlewares
app.use(morgan('dev'));  // Logs to the console in 'dev' format (for development)
app.use(morgan('combined', { stream: accessLogStream }));  // Logs to a file in 'combined' format (for production)

// Set additional middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.29.199:3000/my-account'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);

// Route middlewares
app.use('/api/auth', authRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// GraphQL Server - Start Apollo Server and integrate with the app
startServer(app).then(() => {
  // Start server after Apollo Server is set up
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await connectDB.disconnect(); // Adjust for Prisma or MongoDB
  process.exit(0);
});
