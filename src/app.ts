import express from "express";
import routes from "./routes/index.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import notFoundMiddlware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/", routes);

app.use(notFoundMiddlware);
app.use(errorMiddleware);

export default app;
