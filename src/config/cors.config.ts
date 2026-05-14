import { CorsOptions } from "cors";
import { SECURITY_CONSTANTS } from "../constants/security.constants.js";
import { EHttpMethod } from "../enums/http-methods.enum.js";
import { ENodeEnv } from "../enums/node-env.enum.js";
import { appConfig } from "./app.config.js";

const getAllowedOrigins = (): string[] => {
  if (appConfig.nodeEnv === ENodeEnv.PRODUCTION) {
    return SECURITY_CONSTANTS.CORS.PRODUCTION_ALLOWED_ORIGINS;
  }
  return SECURITY_CONSTANTS.CORS.DEVELOPMENT_ALLOWED_ORIGINS;
};

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: [
    EHttpMethod.GET,
    EHttpMethod.POST,
    EHttpMethod.PATCH,
    EHttpMethod.PUT,
    EHttpMethod.DELETE,
    EHttpMethod.OPTIONS,
  ],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
