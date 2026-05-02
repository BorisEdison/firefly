import { Router } from "express";
import healthRoutes from "./health.routes.js";
import urlRoutes from "./url.routes.js";

const router = Router();

router.use("/health", healthRoutes);

router.use("/api/urls", urlRoutes);

export default router;
