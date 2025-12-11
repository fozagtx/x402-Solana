"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { WalletSignIn } from "@/components/auth/wallet-signin";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo className="w-[160px] mx-auto" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-sentient mb-2">
            Create Your <i className="font-light">x402</i> Account
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            Choose your preferred authentication method
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Wallet Authentication */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-sentient mb-2">Wallet Authentication</h2>
              <p className="text-xs font-mono text-muted-foreground">
                Connect your Solana wallet for instant access
              </p>
            </div>
            <WalletSignIn />
          </div>

          {/* Traditional Authentication */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-sentient mb-2">Email Registration</h2>
              <p className="text-xs font-mono text-muted-foreground">
                Create an account with email and password
              </p>
            </div>
            <SignupForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-mono">
                  Or continue with
                </span>
              </div>
            </div>

            <OAuthButtons />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-mono text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
