const express = require("express");
const routes = require("./routes/index");
const loggerMiddleware = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/", routes);

module.exports = app;
