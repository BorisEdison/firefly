import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { error } from "node:console";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";
import { AppError } from "../utils/app-error.js";
import { sendErrorResponse } from "../utils/api-response.util.js";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response<IApiResponse>,
  _next: NextFunction,
): void => {
  console.log("[ERROR]", err);

  if (err instanceof AppError) {
    sendErrorResponse(res, err.statusCode, err.message);

    return;
  }

  sendErrorResponse(
    res,
    EHttpStatusCode.INTERNAL_SERVER_ERROR,
    en.ERROR.INTERNAL_SERVER_ERROR,
  );
};

export default errorMiddleware;
