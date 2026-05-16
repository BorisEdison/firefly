import { ParamsDictionary } from "express-serve-static-core";

export interface ICreateShortUrlRequestBody {
  url: string;
  customAlias?: string;
  expiresAt?: string;
}

export interface ICreateShortUrlResponse {
  shortUrl: string;
  shortId: string;
  originalUrl: string;
  expiresAt?: Date;
}

export interface IRedirectUrlResponse {
  originalUrl: string;
}

export interface IUrlAnalyticsResponse {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
  expiresAt?: Date;
}

export interface IShortIdRequestParams extends ParamsDictionary {
  shortId: string;
}
