import Redis from "ioredis";
import { config } from "./config";

export const bulRedis = new Redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
})