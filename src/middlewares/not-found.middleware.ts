import { Request, Response, NextFunction } from "express";
import { request } from "node:http";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";
import { AppError } from "../utils/app-error.js";

const notFoundMiddlware = (
  req: Request,
  _res: Response<IApiResponse>,
  next: NextFunction,
): void => {
  next(
    new AppError(
      `${en.ROUTE.NOT_FOUND}: ${req.method} ${req.originalUrl}`,
      EHttpStatusCode.NOT_FOUND,
    ),
  );
};

export default notFoundMiddlware;
