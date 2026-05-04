import { isRedisReady, redisClient } from "../config/redis.config.js";
import { CACHE_CONSTANTS } from "../constants/cache.constants.js";

const getRredirectCacheKey = (shortId: string): string => {
  return `${CACHE_CONSTANTS.URL_REDIRECT_KEY_PREFIX}:${shortId}`;
};

const getRedirectUrl = async (shortId: string): Promise<string | null> => {
  if (!isRedisReady()) {
    return null;
  }

  return redisClient.get(getRredirectCacheKey(shortId));
};

const setRedirectUrl = async (
  shortId: string,
  originalUrl: string,
  ttlSeconds = CACHE_CONSTANTS.URL_REDIRECT_KEY_TTL_SECONDS,
): Promise<void> => {
  if (!isRedisReady()) {
    return;
  }

  await redisClient.set(getRredirectCacheKey(shortId), originalUrl, {
    expiration: {
      type: "EX",
      value: ttlSeconds,
    },
  });
};

const deleteRedirectUrl = async (shortId: string): Promise<void> => {
  if (!isRedisReady()) {
    return;
  }

  await redisClient.del(getRredirectCacheKey(shortId));
};

export const cacheService = {
  getRedirectUrl,
  setRedirectUrl,
  deleteRedirectUrl,
};
