"use client";

import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function WalletButton() {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const address = useMemo(() => {
    if (!publicKey) return null;
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  }, [publicKey]);

  if (publicKey) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/50 text-blue-200 font-mono text-sm">
          {address}
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="rounded-full border-blue-500/50 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      className="rounded-full border-blue-500/50 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
