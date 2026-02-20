import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { generate } from "@clafoutis/generators/tailwind";
import { type Router as ExpressRouter, Router } from "express";

const router: ExpressRouter = Router();

let cachedCSS: { baseCSS: string; darkCSS: string } | null = null;
let generateLock: Promise<void> = Promise.resolve();

async function runGeneration(
  tokenFiles: Record<string, unknown>,
): Promise<{ baseCSS: string; darkCSS: string }> {
  const workDir = path.join(os.tmpdir(), `studio-gen-${Date.now()}`);
  fs.mkdirSync(path.join(workDir, "tokens"), { recursive: true });

  for (const [filePath, content] of Object.entries(tokenFiles)) {
    const fullPath = path.join(workDir, "tokens", filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(content, null, 2));
  }

  try {
    await generate(workDir);

    const buildDir = path.join(workDir, "build", "tailwind");
    const baseCSS = fs.existsSync(path.join(buildDir, "base.css"))
      ? fs.readFileSync(path.join(buildDir, "base.css"), "utf-8")
      : "";
    const darkCSS = fs.existsSync(path.join(buildDir, "dark.css"))
      ? fs.readFileSync(path.join(buildDir, "dark.css"), "utf-8")
      : "";

    cachedCSS = { baseCSS, darkCSS };
    return { baseCSS, darkCSS };
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

router.post("/generate", async (req, res) => {
  const ticket = generateLock.then(() => runGeneration(req.body));
  generateLock = ticket.then(
    () => {},
    () => {},
  );

  try {
    const result = await ticket;
    res.json({ success: true, ...result });
  } catch (genError) {
    const errorMessage =
      genError instanceof Error ? genError.message : String(genError);
    res.json({
      success: false,
      error: { message: errorMessage },
      ...(cachedCSS || {}),
    });
  }
});

export default router;
