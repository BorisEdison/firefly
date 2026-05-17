import mongoose from "mongoose";
import { en } from "../locales/en.js";
import { appConfig } from "./app.config.js";
import { logger } from "../utils/logger.util.js";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.mongoUri);

    logger.info(en.DATABASE.CONNECTED);
  } catch (error) {
    logger.error(en.DATABASE.CONNECTION_FAILED, error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info(en.DATABASE.DISCONNECTED);
};
