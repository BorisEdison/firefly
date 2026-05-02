import { appConfig } from "../config/app.config.js";
import { SHORT_ID_LENGTH } from "../constants/constants.js";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import {
  ICreateShortUrlRequestBody,
  ICreateShortUrlResponse,
} from "../interfaces/url-api.interface.js";
import { en } from "../locales/en.js";
import { UrlModel } from "../models/url.model.js";
import { AppError } from "../utils/app-error.js";
import { generateShortId } from "../utils/short-id.util.js";
import { isValidUrl } from "../utils/url-validator.js";

const createShortUrl = async (
  payload: ICreateShortUrlRequestBody,
): Promise<ICreateShortUrlResponse> => {
  const { url, customAlias } = payload;

  if (!url || !isValidUrl(url)) {
    throw new AppError(
      en.URL.INVALID_ORIGINAL_URL,
      EHttpStatusCode.BAD_REQUEST,
    );
  }

  const shortId = customAlias || generateShortId(SHORT_ID_LENGTH);

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
  });

  return {
    shortUrl: `${appConfig.baseUrl}/${createdUrl.shortId}`,
    shortId: createdUrl.shortId,
    originalUrl: createdUrl.originalUrl,
  };
};

export const urlService = {
  createShortUrl,
};
