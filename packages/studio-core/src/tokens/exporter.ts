import type { DTCGTokenFile } from "../types/tokens";

/** Exports token files back to DTCG JSON format, preserving file structure. */
export function exportTokens(
  tokenFiles: Map<string, DTCGTokenFile>,
): Record<string, DTCGTokenFile> {
  const result: Record<string, DTCGTokenFile> = {};
  for (const [filePath, file] of tokenFiles) {
    result[filePath] = JSON.parse(JSON.stringify(file));
  }
  return result;
}

/**
 * Serializes a single token file to a formatted JSON string.
 * Key order is preserved from the original file.
 * Consistent formatting is enforced by the CI `clafoutis format` command.
 */
export function serializeTokenFile(file: DTCGTokenFile): string {
  return JSON.stringify(file, null, 2) + "\n";
}
