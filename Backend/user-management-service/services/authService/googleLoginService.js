const { OAuth2Client } = require('google-auth-library');
const prisma = require("../../models/prisma/prismaClient");
const { generateTokens } = require("../../utils/tokenUtils");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Logic
const googleLogin = async (tokenId, userAgent, ipAddress) => {
  try {
    // Verify the Google token using Google OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if the user exists in the database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If the user doesn't exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
          profilePicture: picture,
        },
      });
    }

    // Use your utility function to generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Store the refresh token in the database
    const refreshTokenRecord = await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh token expires in 7 days
      },
    });

    // Register the device (Create or Update)
    const device = await prisma.device.upsert({
      where: {
        deviceId: refreshTokenRecord.id, // Use the refresh token id as device id
      },
      update: {
        userAgent,
        ipAddress,
        refreshToken: refreshToken, // Associate the refresh token with the device
      },
      create: {
        userId: user.id,
        deviceId: refreshTokenRecord.id,
        userAgent,
        ipAddress,
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken, user, device };
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Invalid Google token.");
  }
};

module.exports = { googleLogin };
