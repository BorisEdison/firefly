import {Router} from "express"
import { urlController } from "../controllers/url.controller.js";


const router = Router();

router.post('/', urlController.createShortUrl)

export default router;