import { Keypair } from '@solana/web3.js';

/**
 * Test wallet utilities for development
 * Only use with test/devnet environments
 */

export function getTestKeypair(): Keypair {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Test keypair should not be used in production');
  }

  const privateKeyEnv = process.env.SOLANA_TEST_PRIVATE_KEY;
  if (!privateKeyEnv) {
    throw new Error('SOLANA_TEST_PRIVATE_KEY not found in environment');
  }

  try {
    // Parse the JSON array string
    const secretKey = JSON.parse(privateKeyEnv);
    if (!Array.isArray(secretKey) || secretKey.length !== 64) {
      throw new Error('Invalid private key format');
    }

    return Keypair.fromSecretKey(new Uint8Array(secretKey));
  } catch (error) {
    throw new Error(`Failed to create test keypair: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getTestWalletAddress(): string {
  return getTestKeypair().publicKey.toString();
}

export function isTestEnvironment(): boolean {
  const cluster = process.env.SOLANA_CLUSTER || 'devnet';
  return cluster === 'devnet' || cluster === 'testnet';
}

// Export for scripts and testing
export const TEST_KEYPAIR_CONFIG = {
  publicKey: '9nR26wQxwqi4qoHR5CUTNEc4Tbu7x6W625mXHbDEnBpu',
  description: 'Test keypair for development and testing',
  usage: 'Only use on devnet/testnet - NEVER in production'
};