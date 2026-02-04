import { createRequire } from 'module';

import { validateConfig } from '../cli/validation.js';

const require = createRequire(import.meta.url);
const consumerSchema = require('../../schemas/consumer-config.json');
const producerSchema = require('../../schemas/producer-config.json');

/**
 * Validates a consumer configuration object against the JSON schema.
 * Also warns about unknown or deprecated fields.
 * Throws a ClafoutisError if validation fails.
 */
export function validateConsumerConfig(config: unknown): void {
  validateConfig(
    config as Record<string, unknown>,
    consumerSchema,
    '.clafoutis/consumer.json'
  );
}

/**
 * Validates a producer configuration object against the JSON schema.
 * Also warns about unknown or deprecated fields.
 * Throws a ClafoutisError if validation fails.
 */
export function validateProducerConfig(config: unknown): void {
  validateConfig(
    config as Record<string, unknown>,
    producerSchema,
    '.clafoutis/producer.json'
  );
}
