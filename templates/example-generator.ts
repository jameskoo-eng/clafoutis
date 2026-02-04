import type { GeneratorPlugin } from '../cli/types.js';
import fs from 'fs';
import path from 'path';

/**
 * Example custom generator that outputs a simple JSON manifest.
 * Use this as a starting point for your own generators.
 *
 * This generator demonstrates the basic structure of a Clafoutis plugin:
 * - It receives a context object with tokensDir, outputDir, config, and StyleDictionary
 * - It reads token files from tokensDir
 * - It writes generated output to outputDir
 *
 * @example
 * ```json
 * // clafoutis.config.json
 * {
 *   "tokens": "./tokens",
 *   "output": "./build",
 *   "generators": {
 *     "manifest": "./generators/example-generator.ts"
 *   }
 * }
 * ```
 */
export const generate: GeneratorPlugin = async ({ tokensDir, outputDir }) => {
  fs.mkdirSync(outputDir, { recursive: true });

  const tokenFiles = fs.readdirSync(tokensDir, { recursive: true })
    .filter((f): f is string => typeof f === 'string' && f.endsWith('.json'));

  const manifest = {
    generatedAt: new Date().toISOString(),
    tokenFiles,
    outputDir,
  };

  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
};
