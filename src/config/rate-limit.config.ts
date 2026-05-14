import rateLimit from "express-rate-limit";
import { IApiResponse } from "../interfaces/api-response.interface.js";
import { en } from "../locales/en.js";
import { RATE_LIMIT_CONSTANTS } from "../constants/rate-llimit.constants.js";
import { EHttpStatusCode } from "../enums/http-status.enum.js";

const createRateLimitMessage = (): IApiResponse => ({
  success: false,
  message: en.RATE_LIMIT.TOO_MANY_REQUESTS,
});

export const generalRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONSTANTS.GENERAL.WINDOW_MS,
  limit: RATE_LIMIT_CONSTANTS.GENERAL.MAX_REQUESTS,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  statusCode: EHttpStatusCode.TOO_MANY_REQUESTS,
  message: createRateLimitMessage(),
});

export const createShortUrlRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONSTANTS.CREATE_SHORT_URL.WINDOW_MS,
  limit: RATE_LIMIT_CONSTANTS.CREATE_SHORT_URL.MAX_REQUESTS,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  statusCode: EHttpStatusCode.TOO_MANY_REQUESTS,
  message: createRateLimitMessage(),
});

export const redirectRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONSTANTS.REDIRECT.WINDOW_MS,
  limit: RATE_LIMIT_CONSTANTS.REDIRECT.MAX_REQUESTS,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  statusCode: EHttpStatusCode.TOO_MANY_REQUESTS,
  message: createRateLimitMessage(),
});
