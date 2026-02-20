import { logger } from "@clafoutis/shared";

import { createApp } from "./app.js";
import { getServerConfig } from "./config/index.js";

const app = createApp();
const serverConfig = getServerConfig();

const server = app.listen(serverConfig.port, () => {
  logger.info(
    `Studio server running on port ${serverConfig.port} (${serverConfig.nodeEnv})`,
  );
});

function shutdown() {
  logger.info("Shutting down...");
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
