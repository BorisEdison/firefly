import { Request, Response, NextFunction } from "express";
import { ICreateShortUrlRequestBody } from "../interfaces/url-api.interface.js";
import { isValidUrl } from "../utils/url-validator.js";
import { AppError } from "../utils/app-error.js";
import { en } from "../locales/en.js";
import {
  isReservedCustomAlias,
  isValidCustomAlias,
  isValidCustomAliasLength,
} from "../utils/custom-alias-validator.util.js";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { isFutureDate, parseFutureDate } from "../utils/date-validator.util.js";

export const validateCreateShortUrlRequest = (
  req: Request<unknown, unknown, ICreateShortUrlRequestBody>,
  _res: Response,
  next: NextFunction,
): void => {
  const { url, customAlias, expiresAt } = req.body;

  if (!url || !isValidUrl(url)) {
    next(new AppError(en.URL.INVALID_ORIGINAL_URL));
    return;
  }

  if (customAlias) {
    if (!isValidCustomAliasLength(customAlias)) {
      next(
        new AppError(
          en.URL.CUSTOM_ALIAS_LENGTH_INVALID,
          EHttpStatusCode.BAD_REQUEST,
        ),
      );
      return;
    }

    if (!isValidCustomAlias(customAlias)) {
      next(
        new AppError(en.URL.CUSTOM_ALIAS_INVALID, EHttpStatusCode.BAD_REQUEST),
      );
      return;
    }

    if (isReservedCustomAlias(customAlias)) {
      next(
        new AppError(en.URL.CUSTOM_ALIAS_RESERVED, EHttpStatusCode.BAD_REQUEST),
      );

      return;
    }
  }

  if (expiresAt) {
    const parsedExpiryDate = parseFutureDate(expiresAt);

    if (!parsedExpiryDate) {
      next(
        new AppError(en.URL.INVALID_EXPIRY_DATE, EHttpStatusCode.BAD_REQUEST),
      );
      return;
    }

    if (!isFutureDate(parsedExpiryDate)) {
      next(
        new AppError(en.URL.EXPIRY_DATE_IN_PAST, EHttpStatusCode.BAD_REQUEST),
      );
      return;
    }

    req.body.expiresAt = parsedExpiryDate.toISOString();
  }

  next();
};
