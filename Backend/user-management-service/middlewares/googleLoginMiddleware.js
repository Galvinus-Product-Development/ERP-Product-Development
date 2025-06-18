// middlewares/googleLoginMiddleware.js

const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma/prismaClient");
const { generateTokens } = require("../utils/tokenUtils");

const checkIfUserLoggedIn = async (req, res, next) => {
  try {
    // Get the access token from the request (assumed to be in headers or cookies)
    const accessToken =
      req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // Check if access token is provided
    if (accessToken) {
      try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        // If the access token is valid, proceed with the user check
        if (decoded?.userId) {
          const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
          });

          // If the user exists and has logged in with Google before
          if (user && user.googleId) {
            return res
              .status(200)
              .json({ message: "User already logged in with Google." });
          }

          return res
            .status(200)
            .json({ message: "User is already logged in." });
        }
      } catch (err) {
        // If access token is invalid or expired, proceed to check for refresh token
        console.log("Access token expired or invalid");
      }
    }

    // If no access token or the access token is invalid, check for refresh token
    if (refreshToken) {
      try {
        // Verify the refresh token
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_SECRET_REFRESH
        );

        // If the refresh token is valid, generate a new access token
        if (decodedRefresh?.userId) {
          const { accessToken: newAccessToken } = generateTokens(
            decodedRefresh.userId
          );

          // Return the new access token in the response
          return res
            .status(200)
            .json({
              message: "New access token issued.",
              accessToken: newAccessToken,
              refreshToken: refreshToken,
            });
        }
      } catch (err) {
        console.log("Refresh token expired or invalid");
      }
    }

    // If no valid tokens, proceed with the Google login flow
    return next();
  } catch (error) {
    console.error(error);
    return next();
  }
};

module.exports = checkIfUserLoggedIn;
