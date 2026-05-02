import mongoose from "mongoose";
import { en } from "../locales/en.js";
import { appConfig } from "./app.config.js";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.mongoUri);

    console.log(`[INFO] ${en.DATABASE.CONNECTED}`);
  } catch (error) {
    console.log(`[ERROR] ${en.DATABASE.CONNECTION_FAILED}`);
  }
};
