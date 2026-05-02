import { Request, Response, NextFunction } from "express";
import { request } from "node:http";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";

const notFoundMiddlware = (
  req: Request,
  res: Response<IApiResponse>,
  _next: NextFunction,
): void => {
  res.status(EHttpStatusCode.NOT_FOUND).json({
    success: false,
    message: `${en.ROUTE.NOT_FOUND}: ${req.method} ${req.originalUrl}`,
  });
};

export default notFoundMiddlware;
