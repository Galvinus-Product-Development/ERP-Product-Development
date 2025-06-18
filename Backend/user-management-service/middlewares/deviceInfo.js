const getDeviceInfo = (req, res, next) => {
    // Capture device info from the body or headers
    const deviceId = req.body.deviceId || req.headers['x-device-id'];
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
  
    // Validate that required device info is present
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }
  
    if (!userAgent) {
      return res.status(400).json({ error: 'User agent is required' });
    }
  
    if (!ipAddress) {
      return res.status(400).json({ error: 'IP address is required' });
    }
  
    // Assign the device info to the request body for further use
    req.body.deviceId = deviceId;
    req.body.userAgent = userAgent;
    req.body.ipAddress = ipAddress;
  
    // Proceed to the next middleware or route handler
    next();
  };
  
  module.exports = getDeviceInfo;
  