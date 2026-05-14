import { Router } from "express";
import { urlController } from "../controllers/url.controller.js";
import { validateCreateShortUrlRequest } from "../middlewares/url-validation.middleware.js";
import { createShortUrlRateLimiter } from "../config/rate-limit.config.js";

const router = Router();

router.post(
  "/",
  createShortUrlRateLimiter,
  validateCreateShortUrlRequest,
  urlController.createShortUrl,
);

router.get("/:shortId/stats", urlController.getUrlAnalytics);

export default router;
