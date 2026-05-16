import { json } from "node:stream/consumers";
import { isRedisReady, redisClient } from "../config/redis.config.js";
import { CACHE_CONSTANTS } from "../constants/cache.constants.js";
import { IRedirectCacheValue } from "../interfaces/cache.interface.js";

const getRredirectCacheKey = (shortId: string): string => {
  return `${CACHE_CONSTANTS.URL_REDIRECT_KEY_PREFIX}:${shortId}`;
};

const getRedirectUrl = async (
  shortId: string,
): Promise<IRedirectCacheValue | null> => {
  if (!isRedisReady()) {
    return null;
  }

  const cachedValue = await redisClient.get(getRredirectCacheKey(shortId));

  if (!cachedValue) {
    return null;
  }

  try {
    return JSON.parse(cachedValue) as IRedirectCacheValue;
  } catch {
    await deleteRedirectUrl(shortId);
    return null;
  }
};

const setRedirectUrl = async (
  shortId: string,
  value: IRedirectCacheValue,
  ttlSeconds = CACHE_CONSTANTS.URL_REDIRECT_KEY_TTL_SECONDS,
): Promise<void> => {
  if (!isRedisReady()) {
    return;
  }

  await redisClient.set(getRredirectCacheKey(shortId), JSON.stringify(value), {
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
