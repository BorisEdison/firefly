import { APP_CONSTANTS } from "../constants/app.constants.js";
import { ENodeEnv } from "../enums/node-env.enum.js";

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
};
