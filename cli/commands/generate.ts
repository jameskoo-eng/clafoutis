import { readProducerConfig, fileExists } from '../utils/config.js';
import { validateProducerConfig } from '../utils/validate.js';
import { logger } from '../../utils/logger.js';
import { ClafoutisError, configNotFoundError, tokensDirNotFoundError, generatorNotFoundError, pluginLoadError } from '../utils/errors.js';
import type { ProducerConfig } from '../types.js';
import StyleDictionary from 'style-dictionary';
import path from 'path';
import { pathToFileURL } from 'url';

interface GenerateOptions {
  config?: string;
  tailwind?: boolean;
  figma?: boolean;
  output?: string;
  dryRun?: boolean;
}

/**
 * Converts a kebab-case string to camelCase.
 */
function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Loads a generator plugin from a file path.
 * Supports both JavaScript and TypeScript files.
 */
async function loadPlugin(pluginPath: string): Promise<{ generate: Function }> {
  const absolutePath = path.resolve(process.cwd(), pluginPath);

  if (pluginPath.endsWith('.ts')) {
    const { register } = await import('tsx/esm/api');
    register();
  }

  return import(pathToFileURL(absolutePath).href);
}

/**
 * Main generate command handler.
 * Reads configuration, validates it, and runs enabled generators.
 */
export async function generateCommand(options: GenerateOptions): Promise<void> {
  const configPath = options.config || '.clafoutis/producer.json';

  let config = await readProducerConfig(configPath);

  if (!config) {
    if (await fileExists(configPath)) {
      throw new ClafoutisError(
        'Invalid configuration',
        `Could not parse ${configPath}`,
        'Ensure the file contains valid JSON'
      );
    }
    throw configNotFoundError(configPath, false);
  }

  validateProducerConfig(config);

  if (options.tailwind || options.figma) {
    config = {
      ...config,
      generators: {
        'tailwind': options.tailwind || false,
        'figma': options.figma || false,
      }
    };
  }

  if (options.output) {
    config.output = options.output;
  }

  const tokensDir = path.resolve(process.cwd(), config.tokens || './tokens');
  const outputDir = path.resolve(process.cwd(), config.output || './build');

  if (!await fileExists(tokensDir)) {
    throw tokensDirNotFoundError(tokensDir);
  }

  if (options.dryRun) {
    logger.info('[dry-run] Would read tokens from: ' + tokensDir);
    logger.info('[dry-run] Would write to: ' + outputDir);
    for (const [name, value] of Object.entries(config.generators)) {
      if (value !== false) {
        const type = typeof value === 'string' ? 'custom' : 'built-in';
        logger.info(`[dry-run] Would run generator: ${name} (${type})`);
      }
    }
    return;
  }

  logger.info(`Tokens: ${tokensDir}`);
  logger.info(`Output: ${outputDir}`);

  const generators = config.generators || { 'tailwind': true, 'figma': true };

  for (const [name, value] of Object.entries(generators)) {
    if (value === false) continue;

    logger.info(`Running ${name} generator...`);

    try {
      let generatorModule: { generate: Function };

      if (typeof value === 'string') {
        try {
          generatorModule = await loadPlugin(value);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          throw pluginLoadError(value, errorMessage);
        }

        if (typeof generatorModule.generate !== 'function') {
          throw pluginLoadError(value, 'Module does not export a "generate" function');
        }
      } else {
        const generatorName = camelCase(name);
        const generatorPath = path.join(import.meta.dirname, '..', '..', 'generators', name, `${generatorName}Generator.js`);

        if (!await fileExists(generatorPath.replace('.js', '.ts')) && !await fileExists(generatorPath)) {
          throw generatorNotFoundError(name);
        }

        try {
          generatorModule = await import(pathToFileURL(generatorPath).href);
        } catch {
          const tsPath = generatorPath.replace('.js', '.ts');
          generatorModule = await loadPlugin(tsPath);
        }
      }

      await generatorModule.generate({
        tokensDir,
        outputDir: path.join(outputDir, name),
        config,
        StyleDictionary
      });

      logger.success(`${name} complete`);
    } catch (err) {
      if (err instanceof ClafoutisError) {
        throw err;
      }
      logger.error(`${name} failed: ${err}`);
    }
  }

  logger.success('Generation complete');
}
