import { Router } from "express";
import healthRoutes from "./health.routes.js";
import urlRoutes from "./url.routes.js";
import { urlController } from "../controllers/url.controller.js";

const router = Router();

router.use("/health", healthRoutes);

router.use("/api/urls", urlRoutes);

router.get("/:shortId", urlController.redirectUrl);

export default router;
