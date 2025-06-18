const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const prisma = require('../models/prisma/prismaClient'); // Prisma client for database operations
const redisClient = require('../config/redisClient'); // Adjust path to your Redis client
dotenv.config();

const verifyTokens = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const refreshToken = req.headers['x-refresh-token'];
    const accessToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // No tokens provided
    if (!accessToken && !refreshToken) {
      console.log('No tokens provided. Proceeding to login/register.');
      return next();
    }

    // Check if access token is blacklisted
    if (accessToken) {
      const isAccessTokenBlacklisted = await redisClient.get(accessToken);
      if (isAccessTokenBlacklisted) {
        console.log('Access token is blacklisted.');
        return next();
      }

      // Verify Access Token
      try {
        const user = jwt.verify(accessToken, process.env.JWT_SECRET);
        // Access token is valid — user is already logged in
        return res.status(200).json({ message: 'You are already logged in.' });
      } catch (err) {
        if (err.name !== 'TokenExpiredError') {
          console.log('Access token invalid.');
          return next(); // Invalid access token
        }
        // Access token expired, continue to refresh logic
      }
    }

    // Handle expired access token and valid refresh token
    if (refreshToken) {
      const isRefreshTokenBlacklisted = await redisClient.get(refreshToken);
      if (isRefreshTokenBlacklisted) {
        console.log('Refresh token is blacklisted.');
        return next();
      }

      try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Issue a new access token
        const newAccessToken = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Optionally set the new token in headers
        res.setHeader('authorization', `Bearer ${newAccessToken}`);

        return res.status(200).json({
          message: 'New access token issued.',
          accessToken: newAccessToken,
          refreshToken
        });
      } catch (err) {
        console.log('Refresh token is invalid or expired.');

        // Delete refresh token from DB if invalid
        await prisma.refreshToken.deleteMany({
          where: { token: refreshToken },
        });

        return next();
      }
    }

    // If no valid access or refresh token
    console.log('No valid tokens. Proceeding to login/register.');
    return next();
  } catch (err) {
    console.error('Error in token verification:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = verifyTokens;