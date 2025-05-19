const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();
const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
const redisClient = redis.createClient({
  url: REDIS_URI ,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`🔄 Redis reconnect attempt #${retries}`);
      if (retries > 5) {
        console.error("❌ Redis failed to connect after multiple attempts.");
        return new Error("Redis connection failed");
      }
      return Math.min(retries * 500, 3000); // Retry delay
    },
  },
});


redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => console.log("❌ Redis Connection Error:", err));

//redisClient.connect();


module.exports = { redisClient };
