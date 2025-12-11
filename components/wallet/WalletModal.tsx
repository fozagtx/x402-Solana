"use client";

import { WalletModal as SolanaWalletModal, useWalletModal } from "@solana/wallet-adapter-react-ui";

/**
 * Wallet selection modal component
 * Uses the built-in wallet adapter modal with custom styling
 */
export function WalletModal() {
  const { setVisible } = useWalletModal();

  return (
    <SolanaWalletModal
      className="wallet-adapter-modal"
      onClose={() => setVisible(false)}
    />
  );
}
