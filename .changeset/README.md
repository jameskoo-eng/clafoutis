# Changesets

This folder contains changesets that describe changes to published packages. Changesets are used to version packages and generate changelogs automatically.

## Adding a changeset

Run the interactive command:

```bash
pnpm changeset
```

Or create a markdown file manually in this directory with the following format:

```markdown
---
"clafoutis": minor
---

Brief description of the change.
```

## Semantic Versioning Guide

Choose the correct bump type based on the nature of your change:

| Type | When to use | Examples |
|------|-------------|----------|
| `major` | Breaking changes | Removed public API, changed behavior incompatibly |
| `minor` | New features | New command, new flag, new generator |
| `patch` | Bug fixes | Fixed crash, corrected output, documentation fix |

## Changeset Writing Guidelines

### Structure

A changeset should contain:
1. The affected package(s) and bump type in the frontmatter
2. A concise summary (1-2 sentences) in the body

### Good Examples

```markdown
---
"clafoutis": minor
---

Add interactive wizard to `init` command with guided setup for producer and consumer modes.
```

```markdown
---
"clafoutis": patch
---

Fix config validation to correctly handle nested generator options.
```

```markdown
---
"clafoutis": major
---

Remove deprecated `--css` generator flag. Use `--tailwind` instead.
```

### Multiple Packages

When changes affect multiple packages:

```markdown
---
"clafoutis": minor
"@clafoutis/generators": minor
---

Add Figma generator with variable export support.
```

### What NOT to Include

- Internal refactoring that doesn't affect users (no changeset needed)
- Changes to dev dependencies only (no changeset needed)
- Changes to internal packages like `@clafoutis/eslint-config` (ignored in config)

## Versioning Workflow

When changes are merged to main, the release bot will create a "Version Packages" PR that:
- Bumps the package version based on changesets
- Updates the CHANGELOG.md with all changes
- Prepares for npm publishing

Once the "Version Packages" PR is merged, the release bot will automatically publish to npm.
