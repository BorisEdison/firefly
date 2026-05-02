import { EHttpStatusCode } from "../enums/http-status.enum.js";
import { en } from "../locales/en.js";
import { urlService } from "../services/url.service.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { Request, Response } from "express";

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

export const urlController = {
  createShortUrl,
};
