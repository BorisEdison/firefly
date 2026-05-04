import { createClient } from "redis";
import { en } from "../locales/en.js";
import { appConfig } from "./app.config.js";

export const redisClient = createClient({
  url: appConfig.redisUrl,
});

redisClient.on("error", (error) => {
  console.error(`[ERROR] ${en.REDIS.CONNECTION_FAILED}`, error);
});

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log(`[INFO] ${en.REDIS.CONNECTED}`);
  } catch (error) {
    console.error(`[ERROR] ${en.REDIS.CONNECTION_FAILED}`, error);
  }
};

export const isRedisReady = (): boolean => {
  return redisClient.isReady;
};
