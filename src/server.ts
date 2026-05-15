import "./config/env.config.js";

import app from "./app.js";
import { appConfig } from "./config/app.config.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./config/database.config.js";
import { connectRedis, disconnectRedis } from "./config/redis.config.js";
import { Server } from "node:http";

let server: Server;

const shutdown = async (signal: string): Promise<void> => {
  console.log(`[INFO] ${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("[INFO] HTTP server closed");

      try {
        await disconnectDatabase();
        await disconnectRedis();

        console.log("[INFO] Shutdown completed");
        process.exit(0);
      } catch (error) {
        console.error("[ERROR] Error during shutdown", error);
        process.exit(1);
      }
    });
  }
};

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await connectRedis();

  server = app.listen(appConfig.port, () => {
    console.log(`[INFO] Server running on port ${appConfig.port}`);
  });
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();
