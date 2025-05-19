const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false, // Disable logging in production
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB, ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL, PAYMENT_SERVICE_URL: process.env.PAYMENT_SERVICE_URL, SHIPPING_SERVICE_URL: process.env.SHIPPING_SERVICE_URL };
