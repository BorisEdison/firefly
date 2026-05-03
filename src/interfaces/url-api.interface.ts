export interface ICreateShortUrlRequestBody {
  url: string;
  customAlias?: string;
}

export interface ICreateShortUrlResponse {
  shortUrl: string;
  shortId: string;
  originalUrl: string;
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
}
