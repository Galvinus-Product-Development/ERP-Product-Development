const prisma = require('../../models/prisma/prismaClient'); // Adjust the path to your Prisma client
const redisClient = require('../../config/redisClient'); // Redis client instance
const jwt = require('jsonwebtoken'); // For decoding the token

const logout = async (req, res) => {
  const accessToken = req.headers['authorization']?.split(' ')[1];
  const refreshToken = req.headers['x-refresh-token'];

  // Check if both tokens are provided
  if (!accessToken || !refreshToken) {
    console.log("entered>>>>>>>>>>>>>>>>>>>")
    return res.status(400).json({ message: 'Both access token and refresh token are required.' });
  }

  try {
    
    // Find the refresh token in the database
    const existingToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!existingToken) {
      return res.status(400).json({ message: 'Invalid refresh token.' });
    }

    // Delete the refresh token from the database
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    // Blacklist the access token in Redis
    const decoded = jwt.decode(accessToken); // Decode the token to get its expiration time
    if (!decoded) {
      return res.status(400).json({ message: 'Invalid access token.' });
    }

    const remainingTime = decoded.exp * 1000 - Date.now(); // Calculate remaining time in milliseconds
    if (remainingTime > 0) {
      await redisClient.set(accessToken, 'blacklisted', 'PX', remainingTime); // Add to Redis with expiration
    }

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { logout };