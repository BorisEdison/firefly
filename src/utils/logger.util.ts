import { format } from "node:path";
import { ELogLevel } from "../enums/log-level.enum.js";

const formatMessage = (level: ELogLevel, message: string): string => {
  return `[${level}] ${message}`;
};

const info = (message: string, meta?: unknown): void => {
  if (meta !== undefined) {
    console.log(formatMessage(ELogLevel.INFO, message), meta);
    return;
  }

  console.log(formatMessage(ELogLevel.INFO, message));
};

const warn = (message: string, meta?: unknown): void => {
  if (meta !== undefined) {
    console.warn(formatMessage(ELogLevel.WARN, message), meta);
    return;
  }
  console.warn(formatMessage(ELogLevel.WARN, message));
};

const error = (message: string, meta?: unknown): void => {
  if (meta !== undefined) {
    console.error(formatMessage(ELogLevel.ERROR, message), meta);
    return;
  }
  console.error(formatMessage(ELogLevel.ERROR, message));
};

const debug = (message: string, meta?: unknown): void => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (meta !== undefined) {
    console.debug(formatMessage(ELogLevel.DEBUG, message), meta);
    return;
  }

  console.debug(formatMessage(ELogLevel.DEBUG, message));
};

export const logger = {
  info,
  warn,
  debug,
  error,
};
