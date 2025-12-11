"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Loader2, CheckCircle } from "lucide-react";
import bs58 from "bs58";

export function WalletSignIn() {
  const router = useRouter();
  const { publicKey, signMessage, connected, connect } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"connect" | "sign" | "success">("connect");

  const handleWalletSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Step 1: Connect wallet if not connected
      if (!connected) {
        setStep("connect");
        await connect();
        return;
      }

      if (!publicKey || !signMessage) {
        setError("Wallet not properly initialized");
        return;
      }

      setStep("sign");

      // Step 2: Get nonce from server
      const nonceResponse = await fetch("/api/auth/wallet/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: publicKey.toBase58() }),
      });

      if (!nonceResponse.ok) {
        throw new Error("Failed to get authentication nonce");
      }

      const { nonce } = await nonceResponse.json();

      // Step 3: Sign the message
      const message = `Sign this message to authenticate with x402Solana:\n\nNonce: ${nonce}`;
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);

      // Step 4: Authenticate with NextAuth
      const result = await signIn("wallet", {
        publicKey: publicKey.toBase58(),
        signature: bs58.encode(signature),
        nonce,
        redirect: false,
      });

      if (result?.error) {
        setError("Authentication failed. Please try again.");
      } else {
        setStep("success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error("Wallet sign-in error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in with wallet");
      setStep("connect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-background/50 backdrop-blur-sm max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-sentient text-2xl flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          Sign In with Wallet
        </CardTitle>
        <CardDescription className="font-mono">
          Connect your Solana wallet to authenticate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm font-mono text-destructive">
            {error}
          </div>
        )}

        {step === "success" && (
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="font-mono text-sm text-green-300 font-semibold">
                Successfully authenticated!
              </p>
              <p className="font-mono text-xs text-green-400 mt-1">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        {connected && publicKey && step !== "success" && (
          <div className="border border-blue-500/50 rounded-lg p-4 bg-blue-900/20">
            <p className="font-mono text-xs text-blue-300/60 mb-1">Connected Wallet</p>
            <p className="font-mono text-sm text-blue-200 break-all">
              {publicKey.toBase58()}
            </p>
          </div>
        )}

        <Button
          onClick={handleWalletSignIn}
          className="w-full"
          disabled={isLoading || step === "success"}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {step === "connect" && "Connecting..."}
              {step === "sign" && "Signing message..."}
            </>
          ) : step === "success" ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Authenticated
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              {connected ? "Sign Message to Authenticate" : "Connect Wallet"}
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Supported wallets: Phantom, Solflare, Backpack, Glow, Slope, Ledger
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
