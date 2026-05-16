import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { IApiResponse } from "../interfaces/api-response.interface.js";
import { Response } from "express";

export const sendSuccessResponse = <T>(
  res: Response<IApiResponse<T>>,
  statusCode: EHttpStatusCode,
  message: string,
  data?: T,
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendErrorResponse = (
  res: Response<IApiResponse>,
  statusCode: EHttpStatusCode,
  message: string,
  error?: unknown,
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(error !== undefined && { error }),
  });
};
