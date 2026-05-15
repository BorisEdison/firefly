import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors.config.js";
import { SECURITY_CONSTANTS } from "./constants/security.constants.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import notFoundMiddlware from "./middlewares/not-found.middleware.js";
import routes from "./routes/index.js";
import { generalRateLimiter } from "./config/rate-limit.config.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json({ limit: SECURITY_CONSTANTS.JSON_BODY_LIMIT }));

app.use(generalRateLimiter);

app.use(loggerMiddleware);

app.use("/", routes);

app.use(notFoundMiddlware);
app.use(errorMiddleware);

export default app;
