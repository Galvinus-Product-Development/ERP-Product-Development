const { googleLogin } = require("../../services/authService/googleLoginService");

const login = async (req, res) => {
  try {
    const { tokenId } = req.body; // Token sent from the client
    const userAgent = req.headers['user-agent']; // Capture the user agent
    const ipAddress = req.ip; // Capture the IP address of the client

    console.log(tokenId);
    const { accessToken, refreshToken, user, device } = await googleLogin(tokenId, userAgent, ipAddress);

    // Send the tokens and user data in the response
    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
      device: {
        deviceId: device.deviceId,
        userAgent: device.userAgent,
        ipAddress: device.ipAddress,
      },
    });
  } catch (error) {
    console.error("Error in googleLoginController:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { login };
