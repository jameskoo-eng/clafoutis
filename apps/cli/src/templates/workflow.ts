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

      - name: Get next version
        id: version
        run: |
          # Fetch all tags
          git fetch --tags

          # Get the latest semver tag (vX.Y.Z format), default to v0.0.0 if none exist
          LATEST_TAG=$(git tag -l 'v[0-9]*.[0-9]*.[0-9]*' | sort -V | tail -n 1)

          if [ -z "$LATEST_TAG" ]; then
            NEXT_VERSION="v1.0.0"
          else
            # Extract major.minor.patch and increment patch
            VERSION=\${LATEST_TAG#v}
            MAJOR=$(echo $VERSION | cut -d. -f1)
            MINOR=$(echo $VERSION | cut -d. -f2)
            PATCH=$(echo $VERSION | cut -d. -f3)
            NEXT_PATCH=$((PATCH + 1))
            NEXT_VERSION="v$MAJOR.$MINOR.$NEXT_PATCH"
          fi

          echo "version=$NEXT_VERSION" >> $GITHUB_OUTPUT
          echo "Next version: $NEXT_VERSION"

      - name: Create Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: \${{ steps.version.outputs.version }}
          name: Design Tokens \${{ steps.version.outputs.version }}
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
