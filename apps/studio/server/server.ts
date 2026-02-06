import { generate } from '@clafoutis/generators/tailwind';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/__studio/oauth/token', async (req, res) => {
  const upstream = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(req.body),
  });
  const data = await upstream.json();
  res.json(data);
});

app.post('/__studio/generate', async (req, res) => {
  try {
    const tokenFiles = req.body;
    const workDir = path.join(os.tmpdir(), `studio-gen-${Date.now()}`);
    fs.mkdirSync(path.join(workDir, 'tokens'), { recursive: true });

    for (const [filePath, content] of Object.entries(tokenFiles)) {
      const fullPath = path.join(workDir, 'tokens', filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, JSON.stringify(content, null, 2));
    }

    const origCwd = process.cwd();
    try {
      process.chdir(workDir);
      await generate();

      const buildDir = path.join(workDir, 'build', 'tailwind');
      const baseCSS = fs.existsSync(path.join(buildDir, 'base.css'))
        ? fs.readFileSync(path.join(buildDir, 'base.css'), 'utf-8')
        : '';
      const darkCSS = fs.existsSync(path.join(buildDir, 'dark.css'))
        ? fs.readFileSync(path.join(buildDir, 'dark.css'), 'utf-8')
        : '';

      res.json({ success: true, baseCSS, darkCSS });
    } catch (genError) {
      const errorMessage = genError instanceof Error ? genError.message : String(genError);
      res.json({ success: false, error: { message: errorMessage } });
    } finally {
      process.chdir(origCwd);
      fs.rmSync(workDir, { recursive: true, force: true });
    }
  } catch {
    res.status(400).json({ error: 'Invalid request body' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Studio server running on port ${PORT}`);
});
