import { Response, Router, Request } from "express";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";
import { sendSuccessResponse } from "../utils/api-response.util.js";
import { ROUTE_CONSTANTS } from "../constants/route.constants.js";

const router = Router();

router.use(ROUTE_CONSTANTS.ROOT, (_req: Request, res: Response<IApiResponse>): void => {
  sendSuccessResponse(res, EHttpStatusCode.OK, en.SERVER.RUNNING);
});

export default router;
