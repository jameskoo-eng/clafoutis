import { logger } from '@clafoutis/shared';

import type { ClafoutisConfig } from '../types.js';
import {
  authRequiredError,
  ClafoutisError,
  releaseNotFoundError,
} from './errors.js';

interface GitHubRelease {
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
}

/**
 * Downloads release assets from a GitHub repository.
 * Fetches the release metadata and then downloads each requested file.
 *
 * @param config - Consumer configuration containing repo, version, and files to download
 * @returns Map of filename to file content
 * @throws ClafoutisError if any requested assets are missing or fail to download
 */
export async function downloadRelease(
  config: ClafoutisConfig
): Promise<Map<string, string>> {
  const token = process.env.CLAFOUTIS_REPO_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'clafoutis-cli',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const releaseUrl = `https://api.github.com/repos/${config.repo}/releases/tags/${config.version}`;
  const releaseRes = await fetch(releaseUrl, { headers });

  if (!releaseRes.ok) {
    if (releaseRes.status === 404) {
      throw releaseNotFoundError(config.version, config.repo);
    } else if (releaseRes.status === 401 || releaseRes.status === 403) {
      throw authRequiredError();
    } else {
      logger.error(`GitHub API error: ${releaseRes.status}`);
      process.exit(1);
    }
  }

  const release = (await releaseRes.json()) as GitHubRelease;
  const files = new Map<string, string>();
  const missingAssets: string[] = [];
  const failedDownloads: string[] = [];

  for (const assetName of Object.keys(config.files)) {
    const asset = release.assets.find(a => a.name === assetName);

    if (!asset) {
      missingAssets.push(assetName);
      continue;
    }

    logger.info(`Downloading ${assetName}...`);

    const downloadHeaders = { ...headers, Accept: 'application/octet-stream' };
    const fileRes = await fetch(asset.browser_download_url, {
      headers: downloadHeaders,
    });

    if (!fileRes.ok) {
      failedDownloads.push(assetName);
      continue;
    }

    files.set(assetName, await fileRes.text());
  }

  const errors: string[] = [];
  if (missingAssets.length > 0) {
    errors.push(`Assets not found in release: ${missingAssets.join(', ')}`);
  }
  if (failedDownloads.length > 0) {
    errors.push(`Failed to download: ${failedDownloads.join(', ')}`);
  }

  if (errors.length > 0) {
    const availableAssets = release.assets.map(a => a.name).join(', ');
    throw new ClafoutisError(
      'Download failed',
      errors.join('\n'),
      `Available assets in ${config.version}: ${availableAssets || 'none'}`
    );
  }

  return files;
}
