const bcrypt = require('bcryptjs');
const prisma = require('../../models/prisma/prismaClient'); // Prisma client initialization
const { generateTokens } = require('../../utils/tokenUtils');

// Service to handle user login
const loginService = async (email, password, deviceId, userAgent, ipAddress) => {
  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the stored hash
  let isPasswordValid;
  if (user.passwordHash) isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Store or update device information in the `Device` table
  let device = await prisma.device.findUnique({
    where: { deviceId }, // Check if the device already exists
  });

  if (!device) {
    // If the device doesn't exist, create a new one
    device = await prisma.device.create({
      data: {
        deviceId,
        userId: user.id,
        userAgent,
        ipAddress,
      },
    });
  } else {
    // Optionally, update device info (e.g., last activity)
    device = await prisma.device.update({
      where: { deviceId },
      data: {
        userAgent,  // Update the userAgent if needed
        ipAddress,  // Update the IP address if needed
      },
    });
  }

  // Store the refresh token in the `RefreshToken` table with the device info
  await prisma.refreshToken.create({
    data: {
      token: refreshToken, // You may hash this before storing for added security
      userId: user.id,
      deviceId: device.id, // Link the refresh token to the device
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
    },
  });

  return { accessToken, refreshToken, device }; // Return the device info along with tokens
};

module.exports = { loginService };
