import { WalletSigner } from './signers';

/**
 * Wallet detection and connection utilities
 * This module provides wallet adapter integration helpers
 */

export type WalletName = 'phantom' | 'solflare' | 'backpack' | 'glow' | 'slope' | 'ledger';

/**
 * Wallet priority order (highest to lowest)
 */
export const WALLET_PRIORITY: WalletName[] = [
  'phantom',
  'solflare',
  'backpack',
  'glow',
  'slope',
  'ledger',
];

/**
 * Check if a wallet is installed (browser extension)
 */
export function isWalletInstalled(name: WalletName): boolean {
  if (typeof window === 'undefined') return false;
  type WalletWindow = Window & {
    solana?: { isPhantom?: boolean };
    solflare?: unknown;
    backpack?: unknown;
    glow?: unknown;
    Slope?: unknown;
  };
  const walletWindow = window as WalletWindow;
  
  switch (name) {
    case 'phantom':
      return !!walletWindow.solana?.isPhantom;
    case 'solflare':
      return !!walletWindow.solflare;
    case 'backpack':
      return !!walletWindow.backpack;
    case 'glow':
      return !!walletWindow.glow;
    case 'slope':
      return !!walletWindow.Slope;
    case 'ledger':
      // Ledger requires hardware connection, check differently
      return false; // Will be handled by wallet adapter
    default:
      return false;
  }
}

/**
 * Detect all installed wallets
 */
export function detectInstalledWallets(): WalletName[] {
  return WALLET_PRIORITY.filter(name => isWalletInstalled(name));
}

/**
 * Get the best available wallet (highest priority)
 */
export function getBestAvailableWallet(): WalletName | null {
  const installed = detectInstalledWallets();
  return installed.length > 0 ? installed[0] : null;
}

/**
 * Convert wallet adapter signer to WalletSigner interface
 */
export function adapterToSigner(adapter: unknown): WalletSigner | null {
  if (
    !adapter ||
    typeof adapter !== 'object' ||
    !('publicKey' in adapter)
  ) {
    return null;
  }

  const walletAdapter = adapter as {
    publicKey: WalletSigner['publicKey'];
    signTransaction?: (tx: Parameters<WalletSigner['signTransaction']>[0]) => Promise<Parameters<WalletSigner['signTransaction']>[0]>;
    signAllTransactions?: (txs: Parameters<NonNullable<WalletSigner['signAllTransactions']>>[0]) => Promise<Parameters<NonNullable<WalletSigner['signAllTransactions']>>[0]>;
  };

  return {
    publicKey: walletAdapter.publicKey,
    signTransaction: async (tx) => {
      if (!walletAdapter.signTransaction) {
        throw new Error('Wallet adapter does not support signTransaction');
      }
      return walletAdapter.signTransaction(tx);
    },
    signAllTransactions: walletAdapter.signAllTransactions
      ? async (txs) => walletAdapter.signAllTransactions(txs)
      : undefined,
  };
}

/**
 * Get wallet display name
 */
export function getWalletDisplayName(name: WalletName): string {
  const names: Record<WalletName, string> = {
    phantom: 'Phantom',
    solflare: 'Solflare',
    backpack: 'Backpack',
    glow: 'Glow',
    slope: 'Slope',
    ledger: 'Ledger',
  };
  return names[name] || name;
}

/**
 * Get wallet installation URL
 */
export function getWalletInstallUrl(name: WalletName): string {
  const urls: Record<WalletName, string> = {
    phantom: 'https://phantom.app/',
    solflare: 'https://solflare.com/',
    backpack: 'https://www.backpack.app/',
    glow: 'https://glow.app/',
    slope: 'https://slope.finance/',
    ledger: 'https://www.ledger.com/',
  };
  return urls[name];
}
