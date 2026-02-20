import { logger } from "@clafoutis/shared";

import { EnvSchema } from "../schemas/env.schema.js";

const env = EnvSchema.safeParse(process.env);

if (!env.success) {
  logger.error("Environment variable validation failed!");
  logger.error("");
  logger.error("Missing or invalid environment variables:");
  for (const issue of env.error.issues) {
    const varName = issue.path.join(".");
    logger.error(`  • ${varName}: ${issue.message}`);
  }
  logger.error("");
  logger.error("Add these variables to your environment.");
  logger.error("See apps/server/.env.example for the complete list.");
  logger.error("");
  logger.error("Full validation errors:");
  logger.error(JSON.stringify(env.error.format(), null, 2));
  throw new Error("Invalid environment variables - see errors above");
}

export const envConfig = env.data;
