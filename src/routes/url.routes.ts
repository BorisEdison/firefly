import { Router } from "express";
import { urlController } from "../controllers/url.controller.js";
import { validateCreateShortUrlRequest } from "../middlewares/url-validation.middleware.js";

const router = Router();

router.post("/", validateCreateShortUrlRequest, urlController.createShortUrl);
router.get("/:shortId/stats", urlController.getUrlAnalytics);

export default router;
