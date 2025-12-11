"use client";

import { Coins, Brain, Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function FeaturePanels() {
  const cardStyles =
    "relative overflow-hidden border border-black/20 bg-white/50 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.18)] transition-all duration-300";

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 container px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 sm:mb-6 text-black">
          The future of commerce is <i className="font-light">agent-to-agent</i>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-black/70 text-balance max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
          x402 unlocks autonomous payment flows where agents can request, verify, and execute cryptocurrency payments in real time - no manual steps, no API sprawl, no centralized control. Powered by Solana devnet/mainnet, SPL tokens, USDC, Google ADK, and x402 Payment Required Protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <Card className={cardStyles}>
          <CardHeader className="pb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-serif text-black">Solana Integration</CardTitle>
            <CardDescription className="text-sm sm:text-base text-black/70">
              Build AI agents that can transact natively on Solana.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black/80">
              <li>• Real x402 payments on Solana devnet & mainnet</li>
              <li>• Automatic SOL/USDC devnet airdrop for testing</li>
              <li>• Integrated Phantom / Solflare wallet flow</li>
              <li>• On-chain transaction verification and explorer links</li>
              <li>• Instant settlement with USDC SPL tokens</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 sm:pt-4">
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Check Solana Account
              </Button>
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Test x402 Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={cardStyles}>
          <CardHeader className="pb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-serif text-black">AI Tools & Agent Framework</CardTitle>
            <CardDescription className="text-sm sm:text-base text-black/70">
              Everything you need to build revenue-generating autonomous agents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black/80">
              <li>• Preconfigured agents built with Google ADK</li>
              <li>• Merchant & buyer agent templates</li>
              <li>• Rich tools for actions, payments, sessions, tracing</li>
              <li>• MCP server, payment testing tools, debugging utilities</li>
              <li>• Local & cloud-based agent execution</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 sm:pt-4">
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Try Live Chat Agent
              </Button>
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Explore ADK Examples
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={cardStyles}>
          <CardHeader className="pb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-serif text-black">x402 Payment Protocol</CardTitle>
            <CardDescription className="text-sm sm:text-base text-black/70">
              The first payment spec designed for AI ↔ AI commerce.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black/80">
              <li>• Machine-verifiable payment requests</li>
              <li>• Price negotiation or fixed pricing</li>
              <li>• Invoice lifecycle (pending → paid → settled)</li>
              <li>• Cryptographic signatures for trustless commerce</li>
              <li>• Built-in replay protection & expiry logic</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 sm:pt-4">
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Learn About x402
              </Button>
              <Button variant="default" size="sm" className="w-full justify-center text-xs sm:text-sm">
                Create Test Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
