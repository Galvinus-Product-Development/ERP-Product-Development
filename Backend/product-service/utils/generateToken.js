/*const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const generateAdminToken = (adminId = 1) => {
  const adminPayload = {
    id: adminId, // Admin user ID  
    role: "admin",
  };

  const token = jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

  console.log("\n✅ Admin JWT Token (Use this in Postman Authorization Header):");
  console.log(`Bearer ${token}\n`);

  return token;
  //console.log("Admin JWT Token:", token);
};

generateAdminToken(1);
*/

//Key: Authorization
//Value: Bearer <PASTE_YOUR_TOKEN_HERE>

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTE2NzI5LCJleHAiOjE3Mzk5MjAzMjl9.9hNoAFErNDlwn0LR4Aul_m6LHSIx9ikap1CGmlsd02g
//Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTE0ODY2LCJleHAiOjE3Mzk5MTg0NjZ9.qfQ73nWZIdr6H6646r1g-7zitGs3UREGCDxnH00baRE