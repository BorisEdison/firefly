import { CACHE_CONSTANTS } from "../constants/cache.constants.js";

export const calculateRedirectCacheTtl = (expiresAt?: Date): number => {
  if (!expiresAt) {
    return CACHE_CONSTANTS.URL_REDIRECT_KEY_TTL_SECONDS;
  }

  const timeUntilExpiryInSeconds = Math.floor(
    (expiresAt.getTime() - Date.now()) / 1000,
  );

  if (timeUntilExpiryInSeconds <= 0) {
    return 0;
  }

  return Math.min(
    CACHE_CONSTANTS.URL_REDIRECT_KEY_TTL_SECONDS,
    timeUntilExpiryInSeconds,
  );
};
