---
"clafoutis": minor
---

Add interactive wizard for CLI setup with guided producer/consumer configuration.

**New Features:**
- Interactive wizard for `init` command with guided setup prompts
- Multi-select generator selection (Tailwind, Figma)
- Starter token templates automatically created for new producers
- GitHub Actions workflow template for automated releases
- `--dry-run` flag to preview changes without writing files
- `--force` flag to overwrite existing configurations
- `--non-interactive` flag for CI/CD automation with explicit flags
- Wizard prompts when running `generate` or `sync` without config
- Config validation with warnings for unknown/deprecated fields
- Improved error messages with actionable suggestions

**Infrastructure:**
- Restructured to Turborepo monorepo with pnpm workspaces
- Shared ESLint, Prettier, and Vitest configurations
- Makefile task runner replacing justfile
- Husky pre-commit hooks for code quality
