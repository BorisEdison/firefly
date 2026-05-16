import { Router } from "express";
import healthRoutes from "./health.routes.js";
import urlRoutes from "./url.routes.js";
import { urlController } from "../controllers/url.controller.js";
import { redirectRateLimiter } from "../config/rate-limit.config.js";
import { ROUTE_CONSTANTS } from "../constants/route.constants.js";
import { validateShortIdParam } from "../middlewares/url-validation.middleware.js";

const router = Router();

router.use(ROUTE_CONSTANTS.HEALTH.BASE, healthRoutes);

router.use(ROUTE_CONSTANTS.URLS.BASE, urlRoutes);

router.get(
  ROUTE_CONSTANTS.URLS.REDIRECT,
  redirectRateLimiter,
  validateShortIdParam,
  urlController.redirectUrl,
);

export default router;
