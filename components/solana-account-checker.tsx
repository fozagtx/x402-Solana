"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Wallet, CheckCircle } from "lucide-react";
import { WalletButton } from "./wallet/WalletButton";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export function SolanaAccountChecker() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey && connected) {
      // Fetch balance
      connection.getBalance(publicKey).then((lamports) => {
        const sol = lamports / LAMPORTS_PER_SOL;
        setBalance(`${sol.toFixed(4)} SOL`);
      }).catch((error) => {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, connected, connection]);

  return (
    <Card className="border-blue-500/50 bg-blue-950/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-blue-100">
              <Wallet className="w-5 h-5 text-blue-400" />
              Solana Account
            </CardTitle>
            <CardDescription className="font-mono text-blue-300">
              Connect your wallet to check balance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected ? (
          <WalletButton />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-mono">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-blue-200">Connected</span>
            </div>
            <div className="border border-blue-500/50 rounded-lg p-4 space-y-2 bg-blue-900/30">
              <div>
                <div className="text-xs font-mono text-blue-300/60 mb-1">Address</div>
                <div className="text-sm font-mono text-blue-200 break-all">
                  {publicKey?.toBase58()}
                </div>
              </div>
              {balance && (
                <div>
                  <div className="text-xs font-mono text-blue-300/60 mb-1">Balance</div>
                  <div className="text-lg font-sentient text-blue-400">{balance}</div>
                </div>
              )}
            </div>
            <WalletButton />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
