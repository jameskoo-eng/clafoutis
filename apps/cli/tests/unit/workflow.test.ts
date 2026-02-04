import { describe, it, expect } from 'vitest';
import {
  getWorkflowTemplate,
  getWorkflowPath,
} from '../../src/templates/workflow.js';

describe('getWorkflowTemplate', () => {
  it('returns valid YAML content', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('name: Design Token Release');
    expect(template).toContain('on:');
    expect(template).toContain('jobs:');
  });

  it('triggers on push to main', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('branches: [main]');
  });

  it('triggers on tokens directory changes', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('paths:');
    expect(template).toContain("'tokens/**'");
  });

  it('includes checkout step', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('actions/checkout@v4');
  });

  it('includes node setup step', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('actions/setup-node@v4');
  });

  it('installs clafoutis globally', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('npm install -g clafoutis');
  });

  it('runs generate command', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('clafoutis generate');
  });

  it('creates release with gh-release action', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('softprops/action-gh-release@v2');
  });

  it('computes next semver version from git tags', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('git fetch --tags');
    expect(template).toContain("git tag -l 'v[0-9]*.[0-9]*.[0-9]*'");
    expect(template).toContain('sort -V');
    expect(template).toContain('NEXT_VERSION="v1.0.0"');
    expect(template).toContain('NEXT_PATCH=$((PATCH + 1))');
  });

  it('uploads build artifacts', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('build/**/*');
  });
});

describe('getWorkflowPath', () => {
  it('returns correct GitHub workflow path', () => {
    const path = getWorkflowPath();
    expect(path).toBe('.github/workflows/clafoutis-release.yml');
  });
});
