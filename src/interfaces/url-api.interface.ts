export interface ICreateShortUrlRequestBody {
  url: string;
  customAlias?: string;
}

export interface ICreateShortUrlResponse {
  shortUrl: string;
  shortId: string;
  originalUrl: string;
}
