import { createClient } from "redis";
import { en } from "../locales/en.js";
import { appConfig } from "./app.config.js";
import { logger } from "../utils/logger.util.js";

export const redisClient = createClient({
  url: appConfig.redisUrl,
});

redisClient.on("error", (error) => {
  logger.error(en.REDIS.CONNECTION_FAILED, error);
});

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    logger.info(en.REDIS.CONNECTED);
  } catch (error) {
    logger.error(en.REDIS.CONNECTION_FAILED, error);
  }
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    await redisClient.quit();
    logger.info(en.REDIS.DISCONNECTED);
  }
};

export const isRedisReady = (): boolean => {
  return redisClient.isReady;
};
