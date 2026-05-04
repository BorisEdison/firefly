import { appConfig } from "../config/app.config.js";
import { URL_CONSTANTS } from "../constants/url.constants.js";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import {
  ICreateShortUrlRequestBody,
  ICreateShortUrlResponse,
  IRedirectUrlResponse,
  IUrlAnalyticsResponse,
} from "../interfaces/url-api.interface.js";
import { en } from "../locales/en.js";
import { UrlModel } from "../models/url.model.js";
import { AppError } from "../utils/app-error.js";

import { generateShortId } from "../utils/short-id.util.js";

const createShortUrl = async (
  payload: ICreateShortUrlRequestBody,
): Promise<ICreateShortUrlResponse> => {
  const { url, customAlias, expiresAt } = payload;

  const shortId = customAlias || generateShortId(URL_CONSTANTS.SHORT_ID_LENGTH);

  const existingUrl = await UrlModel.findOne({ shortId });

  if (existingUrl) {
    throw new AppError(
      en.URL.CUSTOM_ALIAS_ALREADY_EXISTS,
      EHttpStatusCode.CONFLICT,
    );
  }

  const createdUrl = await UrlModel.create({
    shortId,
    originalUrl: url,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  });

  return {
    shortUrl: `${appConfig.baseUrl}/${createdUrl.shortId}`,
    shortId: createdUrl.shortId,
    originalUrl: createdUrl.originalUrl,
    expiresAt: createdUrl.expiresAt,
  };
};

// find URL only if:
// - it has no expiry
// OR
// - expiry is in the future
const getActiveUrlFilter = (shortId: string) => ({
  shortId,
  $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gt: new Date() } }],
});

const redirectUrl = async (shortId: string): Promise<IRedirectUrlResponse> => {
  const url = await UrlModel.findOneAndUpdate(
    getActiveUrlFilter(shortId),
    {
      $inc: { clicks: 1 },
    },
    {
      new: true, // return the document with the incremented clicks count
    },
  );

  if (!url) {
    const existingUrl = await UrlModel.findOne({ shortId });

    if (existingUrl?.expiresAt && existingUrl.expiresAt <= new Date()) {
      throw new AppError(en.URL.EXPIRED, EHttpStatusCode.GONE);
    }

    throw new AppError(en.URL.NOT_FOUND, EHttpStatusCode.NOT_FOUND);
  }

  return {
    originalUrl: url.originalUrl,
  };
};

const getUrlAnalytics = async (
  shortId: string,
): Promise<IUrlAnalyticsResponse> => {
  const url = await UrlModel.findOne({ shortId });

  if (!url) {
    throw new AppError(en.URL.NOT_FOUND, EHttpStatusCode.NOT_FOUND);
  }

  return {
    shortId: url.shortId,
    shortUrl: `${appConfig.baseUrl}/${url.shortId}`,
    originalUrl: url.originalUrl,
    clicks: url.clicks,
    expiresAt: url.expiresAt,
    createdAt: url.createdAt,
  };
};

export const urlService = {
  createShortUrl,
  redirectUrl,
  getUrlAnalytics,
};
