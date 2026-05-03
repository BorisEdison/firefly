import { Request, Response } from "express";
import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { urlService } from "../services/url.service.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

const createShortUrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await urlService.createShortUrl(req.body);

    res.status(EHttpStatusCode.CREATED).json({
      success: true,
      message: en.URL.CREATED,
      data: result,
    });
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

    res.status(EHttpStatusCode.OK).json({
      success: true,
      message: en.URL.ANALYTICS_FETCHED,
      data: result,
    });
  },
);

export const urlController = {
  createShortUrl,
  redirectUrl,
  getUrlAnalytics,
};
