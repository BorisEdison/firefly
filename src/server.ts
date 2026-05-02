import "./config/env.config.js";

import app from "./app.js";
import { appConfig } from "./config/app.config.js";
import { connectDatabase } from "./config/database.config.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(appConfig.port, () => {
    console.log(`[INFO] Server running on port ${appConfig.port}`);
  });
};

void startServer();
