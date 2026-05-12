import { Queue } from "bullmq";
import { bulRedis } from "../config/message-redis";

export const emailQueue = new Queue("email-queue",{
    connection: bulRedis
})