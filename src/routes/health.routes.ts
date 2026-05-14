import { Response, Router, Request } from "express";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";

const router = Router();

router.use("/", (_req: Request, res: Response<IApiResponse>): void => {
  res.status(EHttpStatusCode.OK).json({
    success: true,
    message: en.SERVER.RUNNING,
  });
});

export default router;
