import "./config/env.config.js";

import app from "./app.js";
import { appConfig } from "./config/app.config.js";

app.listen(appConfig.port, () => {
  console.log(`[INFO] Server running on port ${appConfig.port}`);
});
