import { type Router as ExpressRouter, Router } from "express";

import { getGitHubConfig } from "../config/index.js";

const router: ExpressRouter = Router();

router.post("/oauth/token", async (req, res) => {
  const gitHubConfig = getGitHubConfig();
  let upstream: Response;
  try {
    upstream = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...req.body,
        client_secret: gitHubConfig.clientSecret,
      }),
    });
  } catch (err) {
    console.error("OAuth proxy: fetch to GitHub failed", err);
    res.status(502).json({ error: "Failed to reach GitHub OAuth endpoint" });
    return;
  }

  if (!upstream.ok) {
    let body: unknown;
    try {
      body = await upstream.json();
    } catch {
      body = await upstream
        .text()
        .catch(() => "Unable to read upstream response");
    }
    console.error(`OAuth proxy: GitHub returned ${upstream.status}`, body);
    res.status(upstream.status).json({
      error: "GitHub OAuth request failed",
      status: upstream.status,
      details: body,
    });
    return;
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch (err) {
    console.error(
      "OAuth proxy: failed to parse JSON from GitHub response",
      err,
    );
    res.status(502).json({ error: "Invalid JSON in GitHub OAuth response" });
    return;
  }

  res.json(data);
});

export default router;
