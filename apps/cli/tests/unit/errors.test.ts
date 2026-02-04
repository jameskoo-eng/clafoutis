import { describe, it, expect } from 'vitest';
import {
  ClafoutisError,
  configNotFoundError,
  invalidRepoError,
  releaseNotFoundError,
  authRequiredError,
  generatorNotFoundError,
  pluginLoadError,
  tokensDirNotFoundError,
  configExistsError,
  networkError,
  invalidFlagsError,
} from '../../src/utils/errors.js';

describe('ClafoutisError', () => {
  it('creates error with title and detail', () => {
    const error = new ClafoutisError('Test Error', 'Something went wrong');
    expect(error.title).toBe('Test Error');
    expect(error.detail).toBe('Something went wrong');
    expect(error.suggestion).toBeUndefined();
    expect(error.message).toBe('Test Error: Something went wrong');
  });

  it('creates error with suggestion', () => {
    const error = new ClafoutisError('Test Error', 'detail', 'Try this fix');
    expect(error.suggestion).toBe('Try this fix');
  });

  it('formats error with colors', () => {
    const error = new ClafoutisError('Test', 'Detail', 'Suggestion');
    const formatted = error.format();
    expect(formatted).toContain('Error:');
    expect(formatted).toContain('Test');
    expect(formatted).toContain('Detail');
    expect(formatted).toContain('Suggestion:');
    expect(formatted).toContain('Suggestion');
  });

  it('formats error without suggestion', () => {
    const error = new ClafoutisError('Test', 'Detail');
    const formatted = error.format();
    expect(formatted).not.toContain('Suggestion:');
  });
});

describe('configNotFoundError', () => {
  it('creates error for producer config', () => {
    const error = configNotFoundError('.clafoutis/producer.json', false);
    expect(error.title).toBe('Configuration not found');
    expect(error.detail).toContain('.clafoutis/producer.json');
    expect(error.suggestion).toContain('--producer');
  });

  it('creates error for consumer config', () => {
    const error = configNotFoundError('.clafoutis/consumer.json', true);
    expect(error.suggestion).toContain('--consumer');
  });
});

describe('invalidRepoError', () => {
  it('includes repo in error message', () => {
    const error = invalidRepoError('bad-repo');
    expect(error.title).toBe('Invalid repository format');
    expect(error.detail).toContain('bad-repo');
    expect(error.suggestion).toContain('org/repo');
  });
});

describe('releaseNotFoundError', () => {
  it('includes version and repo in error', () => {
    const error = releaseNotFoundError('v1.0.0', 'Acme/design-system');
    expect(error.title).toBe('Release not found');
    expect(error.detail).toContain('v1.0.0');
    expect(error.detail).toContain('Acme/design-system');
  });
});

describe('authRequiredError', () => {
  it('suggests setting CLAFOUTIS_REPO_TOKEN', () => {
    const error = authRequiredError();
    expect(error.title).toBe('Authentication required');
    expect(error.suggestion).toContain('CLAFOUTIS_REPO_TOKEN');
  });
});

describe('generatorNotFoundError', () => {
  it('lists available generators', () => {
    const error = generatorNotFoundError('scss');
    expect(error.title).toBe('Generator not found');
    expect(error.detail).toContain('scss');
    expect(error.suggestion).toContain('tailwind');
    expect(error.suggestion).toContain('figma');
  });
});

describe('pluginLoadError', () => {
  it('includes plugin path and error message', () => {
    const error = pluginLoadError('./my-plugin.ts', 'Module not found');
    expect(error.title).toBe('Plugin load failed');
    expect(error.detail).toContain('./my-plugin.ts');
    expect(error.detail).toContain('Module not found');
  });
});

describe('tokensDirNotFoundError', () => {
  it('includes directory path', () => {
    const error = tokensDirNotFoundError('./tokens');
    expect(error.title).toBe('Tokens directory not found');
    expect(error.detail).toContain('./tokens');
  });
});

describe('configExistsError', () => {
  it('suggests --force flag', () => {
    const error = configExistsError('.clafoutis/producer.json');
    expect(error.title).toBe('Configuration already exists');
    expect(error.suggestion).toContain('--force');
  });
});

describe('networkError', () => {
  it('includes URL and reason', () => {
    const error = networkError(
      'https://api.github.com/repos',
      'Connection refused'
    );
    expect(error.title).toBe('Network error');
    expect(error.detail).toContain('https://api.github.com/repos');
    expect(error.detail).toContain('Connection refused');
  });
});

describe('invalidFlagsError', () => {
  it('joins multiple errors', () => {
    const error = invalidFlagsError(['--foo: invalid', '--bar: missing']);
    expect(error.title).toBe('Invalid flags');
    expect(error.detail).toContain('--foo: invalid');
    expect(error.detail).toContain('--bar: missing');
  });
});
