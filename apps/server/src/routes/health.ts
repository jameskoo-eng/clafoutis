import { type Router as ExpressRouter, Router } from "express";

import { getServerConfig } from "../config/index.js";

const router: ExpressRouter = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: getServerConfig().nodeEnv,
  });
});

export default router;
