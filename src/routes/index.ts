import { Router } from "express";
import healthRoutes from "./health.routes.js";
import urlRoutes from "./url.routes.js";
import { urlController } from "../controllers/url.controller.js";
import { redirectRateLimiter } from "../config/rate-limit.config.js";

const router = Router();

router.use("/health", healthRoutes);

router.use("/api/urls", urlRoutes);

router.get("/:shortId", redirectRateLimiter, urlController.redirectUrl);

export default router;
