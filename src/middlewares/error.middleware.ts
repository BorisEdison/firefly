import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { error } from "node:console";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response<IApiResponse>,
  _next: NextFunction,
): void => {
  console.log("[ERROR]", err);

  res.status(EHttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || en.ERROR.INTERNAL_SERVER_ERROR,
  });
};

export default errorMiddleware;
