import { Router } from "express";
import { urlController } from "../controllers/url.controller.js";
import { validateCreateShortUrlRequest } from "../middlewares/url-validation.middleware.js";
import { createShortUrlRateLimiter } from "../config/rate-limit.config.js";
import { ROUTE_CONSTANTS } from "../constants/route.constants.js";

const router = Router();

router.post(
  ROUTE_CONSTANTS.ROOT,
  createShortUrlRateLimiter,
  validateCreateShortUrlRequest,
  urlController.createShortUrl,
);

router.get(ROUTE_CONSTANTS.URLS.STATS, urlController.getUrlAnalytics);

export default router;
