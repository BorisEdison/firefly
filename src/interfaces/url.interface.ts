import { Document } from "mongoose";

export interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
  clicks: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
