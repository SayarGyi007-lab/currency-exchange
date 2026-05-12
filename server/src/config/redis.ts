import { createClient } from "redis";
import { config } from "./config";

//redis cloud
export const redis = createClient({
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
    socket: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
    }
}) 

export const connectRedis = async () => {
  try {
    await redis.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
};