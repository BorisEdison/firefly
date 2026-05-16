import { Request, Response } from "express";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { urlService } from "../services/url.service.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { sendSuccessResponse } from "../utils/api-response.util.js";

const createShortUrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await urlService.createShortUrl(req.body);

    sendSuccessResponse(res, EHttpStatusCode.CREATED, en.URL.CREATED, result);
  },
);

const redirectUrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { shortId } = req.params;

    // ! will have to remove this ts assertion
    const result = await urlService.redirectUrl(shortId as string);

    res.redirect(result.originalUrl);
  },
);

const getUrlAnalytics = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { shortId } = req.params;

    // ! will have to remove this ts assertion
    const result = await urlService.getUrlAnalytics(shortId as string);

    sendSuccessResponse(
      res,
      EHttpStatusCode.OK,
      en.URL.ANALYTICS_FETCHED,
      result,
    );
  },
);

export const urlController = {
  createShortUrl,
  redirectUrl,
  getUrlAnalytics,
};
