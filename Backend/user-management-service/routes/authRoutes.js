// routes/authRoutes.js

const express = require("express");
const loginController = require("../controllers/authController/loginController");
const registerController = require("../controllers/authController/registerController");
const logoutController = require("../controllers/authController/logoutController");
const googleLoginController = require("../controllers/authController/googleLoginController");
const verifyTokens = require("../middlewares/tokenMiddleware");
const checkIfUserLoggedIn = require("../middlewares/googleLoginMiddleware");
const getDeviceInfo = require("../middlewares/deviceInfo");

const {
  requestPasswordReset,
  completePasswordReset,
} = require("../controllers/authController/passwordResetController");
const router = express.Router();

// Authentication Routes
router.post("/login",getDeviceInfo, verifyTokens, loginController.login);
router.post("/register",getDeviceInfo, verifyTokens, registerController.register);
router.post("/logout",getDeviceInfo, logoutController.logout);
router.post("/google-login",getDeviceInfo, checkIfUserLoggedIn, googleLoginController.login);

//password reset route
router.post("/password-reset/request", requestPasswordReset);
router.post("/password-reset/complete", completePasswordReset);

module.exports = router;
