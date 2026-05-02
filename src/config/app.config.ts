import { APP_CONSTANTS } from "../constants/app.constants.js";
import { ENodeEnv } from "../enums/node-env.enum.js";
import { en } from "../locales/en.js";

const getStringEnv = (
  key: string,
  required = false,
  requiredMessage = `${key} is required`,
) => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(requiredMessage);
  }

  return value || "";
};

const getNumberEnv = (key: string, defaultValue: number): number => {
  const value = process.env[key];

  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }

  return parsedValue;
};

const getNodeEnv = (): ENodeEnv => {
  const value = process.env.NODE_ENV;

  if (!value) {
    return ENodeEnv.DEVELOPMENT;
  }

  if (
    value !== ENodeEnv.DEVELOPMENT &&
    value !== ENodeEnv.PRODUCTION &&
    value !== ENodeEnv.TEST
  ) {
    throw new Error(
      `NODE_ENV must be one of: ${Object.values(ENodeEnv).join(", ")}`,
    );
  }

  return value;
};

export const appConfig = {
  nodeEnv: getNodeEnv(),
  port: getNumberEnv("PORT", APP_CONSTANTS.DEFAULT_PORT),
  mongoUri: getStringEnv("MONGO_URI", true, en.DATABASE.MONGO_URI_REQUIRED),
  baseUrl: getStringEnv("BASE_URL", true, en.URL.BASE_URL_REQUIRED),
};
