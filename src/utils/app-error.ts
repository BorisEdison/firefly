import { EHttpStatusCode } from "../enums/http-status.enum.js";

export class AppError extends Error {
  public readonly statusCode: EHttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: EHttpStatusCode = EHttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
