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

  it('installs clafoutis as dev dependency', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('npm install -D clafoutis');
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
    expect(template).toContain('fetch-depth: 0');
    expect(template).toContain("git tag -l 'v*'");
    expect(template).toContain('sort -V');
    expect(template).toContain('echo "version=1.0.0"');
    expect(template).toContain('PATCH=$((PATCH + 1))');
  });

  it('prepares release assets with collision detection', () => {
    const template = getWorkflowTemplate();
    expect(template).toContain('release-assets/*');
    expect(template).toContain('Collision detected');
  });
});

describe('getWorkflowPath', () => {
  it('returns correct GitHub workflow path', () => {
    const path = getWorkflowPath();
    expect(path).toBe('.github/workflows/clafoutis-release.yml');
  });
});
