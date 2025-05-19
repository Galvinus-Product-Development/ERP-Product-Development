const { body, validationResult } = require('express-validator');
const { registerUser } = require('../../services/authService/registerService');

// Register Controller with Validation
const register = [
  // Validation middleware
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),

  // Main controller logic
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send only the first error message
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, email, password, deviceId, userAgent, ipAddress } = req.body;

    try {
      // Call the service to handle user registration, token generation, and device registration
      const { accessToken, refreshToken, device } = await registerUser({ name, email, password, deviceId, userAgent, ipAddress });

      // Return the tokens and device info to the client
      res.status(201).json({ accessToken, refreshToken, device });

    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
];

module.exports = { register };
