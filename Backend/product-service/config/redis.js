// config/redis.js
const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
const DEFAULT_EXPIRATION = 3600; // 1 hour cache duration

const redisClient = redis.createClient({
  url: REDIS_URI,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`🔄 Redis reconnect attempt #${retries}`);
      if (retries > 5) {
        console.error("❌ Redis failed to connect after multiple attempts.");
        return new Error("Redis connection failed");
      }
      return Math.min(retries * 500, 3000);
    },
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => console.log("❌ Redis Connection Error:", err));

(async () => {
  await redisClient.connect();
})();

// Helper functions
const getOrSetCache = async (key, cb) => {
  try {
    const data = await redisClient.get(key);
    if (data != null) {
      console.log(`Cache hit for key: ${key}`);
      return JSON.parse(data);
    }
    console.log(`Cache miss for key: ${key}`);
    const freshData = await cb();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error("Redis error:", error);
    return cb(); // Fallback to original function if Redis fails
  }
};

const invalidateCache = async (keyPattern) => {
  try {
    const keys = await redisClient.keys(keyPattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Invalidated cache for pattern: ${keyPattern}`);
    }
  } catch (error) {
    console.error("Cache invalidation error:", error);
  }
};

module.exports = { redisClient, getOrSetCache, invalidateCache };