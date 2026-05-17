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

let server: Server;

const shutdown = async (signal: EServerProcess): Promise<void> => {
  const shutdownMessage =
    signal === EServerProcess.SIGINT
      ? en.PROCESS.SIGINT_RECEIVED
      : en.PROCESS.SIGTERM_RECEIVED;

  console.log(`[INFO] ${shutdownMessage}`);

  if (!server) {
    process.exit(EServerExitCode.SUCCESS);
  }

  server.close(async () => {
    console.log(`[INFO] ${en.PROCESS.HTTP_SERVER_CLOSED}`);

    try {
      await disconnectDatabase();
      await disconnectRedis();

      console.log(`[INFO] ${en.PROCESS.SHUTDOWN_COMPLETED}`);
      process.exit(EServerExitCode.SUCCESS);
    } catch (error) {
      console.error(`[ERROR] ${en.PROCESS.SHUTDOWN_ERROR}`, error);
      process.exit(EServerExitCode.GENERAL_ERROR);
    }
  });
};

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await connectRedis();

  server = app.listen(appConfig.port, () => {
    console.log(`[INFO] Server running on port ${appConfig.port}`);
  });
};

process.on(EServerProcess.SIGINT, () => {
  void shutdown(EServerProcess.SIGINT);
});

process.on(EServerProcess.SIGTERM, () => {
  void shutdown(EServerProcess.SIGTERM);
});

startServer().catch((error: unknown) => {
  console.log(`[ERROR] ${en.PROCESS.STARTUP_FAILED}`, error);
  process.exit(EServerExitCode.GENERAL_ERROR);
});
