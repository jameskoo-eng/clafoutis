/**
 * Returns the GitHub Actions workflow YAML for automatic token releases.
 * Triggers on push to main when tokens change, generates outputs, and creates a release.
 */
export function getWorkflowTemplate(): string {
  return `name: Design Token Release

on:
  push:
    branches: [main]
    paths:
      - 'tokens/**'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Clafoutis
        run: npm install -g clafoutis

      - name: Generate tokens
        run: clafoutis generate

      - name: Get version
        id: version
        run: echo "version=$(date +%Y%m%d.%H%M%S)" >> $GITHUB_OUTPUT

      - name: Create Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v\${{ steps.version.outputs.version }}
          name: Design Tokens v\${{ steps.version.outputs.version }}
          generate_release_notes: true
          files: |
            build/**/*
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
}

/**
 * Returns the standard path for the Clafoutis release workflow.
 */
export function getWorkflowPath(): string {
  return '.github/workflows/clafoutis-release.yml';
}
