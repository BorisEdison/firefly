import "./config/env.config.js";

import { Server } from "node:http";
import app from "./app.js";
import { appConfig } from "./config/app.config.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./config/database.config.js";
import { connectRedis, disconnectRedis } from "./config/redis.config.js";
import { EServerExitCode, EServerProcess } from "./enums/process.enum.js";
import { en } from "./locales/en.js";
import { logger } from "./utils/logger.util.js";

let server: Server;

const shutdown = async (signal: EServerProcess): Promise<void> => {
  const shutdownMessage =
    signal === EServerProcess.SIGINT
      ? en.PROCESS.SIGINT_RECEIVED
      : en.PROCESS.SIGTERM_RECEIVED;

  logger.info(shutdownMessage);

  if (!server) {
    process.exit(EServerExitCode.SUCCESS);
  }

  server.close(async () => {
    logger.info(en.PROCESS.HTTP_SERVER_CLOSED);

    try {
      await disconnectDatabase();
      await disconnectRedis();

      logger.info(en.PROCESS.SHUTDOWN_COMPLETED);
      process.exit(EServerExitCode.SUCCESS);
    } catch (error) {
      logger.error(en.PROCESS.SHUTDOWN_ERROR, error);
      process.exit(EServerExitCode.GENERAL_ERROR);
    }
  });
};

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await connectRedis();

  server = app.listen(appConfig.port, () => {
    logger.info(`Server running on port ${appConfig.port}`);
  });
};

process.on(EServerProcess.SIGINT, () => {
  void shutdown(EServerProcess.SIGINT);
});

process.on(EServerProcess.SIGTERM, () => {
  void shutdown(EServerProcess.SIGTERM);
});

startServer().catch((error: unknown) => {
  logger.error(en.PROCESS.STARTUP_FAILED, error);
  process.exit(EServerExitCode.GENERAL_ERROR);
});
