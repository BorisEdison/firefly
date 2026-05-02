import mongoose, { Schema } from "mongoose";
import { IUrl } from "../interfaces/url.interface.js";
import { COLLECTION_NAMES, MODEL_NAMES } from "../constants/model.constants.js";

const urlSchema = new Schema<IUrl>(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      immmutable: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAMES.URLS,
  },
);

export const UrlModel = mongoose.model<IUrl>(MODEL_NAMES.URL, urlSchema);
