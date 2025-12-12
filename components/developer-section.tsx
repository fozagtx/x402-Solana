"use client";

import { Code, FileCode, Wrench, BookOpen, Terminal, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function DeveloperSection() {
  const cardShell =
    "border border-black/20 bg-white/50 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.12)]";

  return (
    <section id="developers" className="py-12 sm:py-16 lg:py-24 container px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
          For <i className="font-light">Developers</i>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-black/70 text-balance max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          Everything you need to build autonomous payment-enabled agents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
        <Card className={cardShell}>
          <CardHeader>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-serif text-black">SDKs & APIs</CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
              REST & GraphQL APIs, JS/TS & Python SDKs, client & merchant libraries, webhooks for settlement, test harness for simulated payments.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={cardShell}>
          <CardHeader>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-serif text-black">Agent Templates</CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
              Client/buyer agent, merchant agent, payment interpreter agent, verification agent, Telegram bot agent.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={cardShell}>
          <CardHeader>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-serif text-black">Tools</CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
              Live trace inspector, events/state viewer, session replay, invoice dashboard, signature debugger.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Card className={cardShell}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black font-serif">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Build With the Best Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-serif text-base sm:text-lg mb-2 text-black">Google ADK</h4>
              <p className="font-mono text-xs sm:text-sm text-black/70">
                Build autonomous cognitive agents with full visibility into: state, tools, messages, remote agent interactions.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg mb-2 text-black">Solana Web3 Stack</h4>
              <p className="font-mono text-xs sm:text-sm text-black/70">
                @solana/web3.js, SPL Token Program, Token 2022 support, devnet airdrop faucet, Solana RPC/Websocket listeners.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg mb-2 text-black">x402</h4>
              <p className="font-mono text-xs sm:text-sm text-black/70">
                Spec-compliant payment requests for LLM-native commerce.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={cardShell}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black font-serif">
              <Terminal className="w-5 h-5 text-blue-600" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm text-black/80">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Install SDK: npm install @x402/solana-sdk</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Connect wallet: Phantom or Solflare</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Create invoice: createInvoice()</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Watch status: watchInvoice()</span>
              </div>
            </div>
            <Button variant="default" className="w-full mt-4">
              <BookOpen />
              Read the Docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
