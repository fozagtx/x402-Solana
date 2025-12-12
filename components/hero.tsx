"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Bot } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col min-h-svh justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24">
      <div className="text-center relative max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-black mb-6 sm:mb-8">
          x402 meets solana <br />
          <span className="font-light italic">AI-Powered Payments for the Autonomous Web</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Experience real on-chain payments, autonomous agents, and decentralized commerce - all powered by Solana, x402, MCP tools, and the Google ADK. Build, test, and deploy AI agents that can transact, charge, and verify payments - automatically.
        </p>

        {/* CTA Buttons - Responsive for all screen sizes */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 lg:mt-14">
          <Link className="contents" href="/#demo">
            <Button size="sm" className="w-full sm:w-auto sm:hidden">
              <ArrowRight />
              Start Building
            </Button>
            <Button className="hidden sm:inline-flex">
              <ArrowRight />
              Start Building
            </Button>
          </Link>
          <Link className="contents" href="/docs">
            <Button size="sm" variant="default" className="w-full sm:w-auto sm:hidden">
              <BookOpen />
              Documentation
            </Button>
            <Button variant="default" className="hidden sm:inline-flex">
              <BookOpen />
              Explore Documentation
            </Button>
          </Link>
          <Link className="contents" href="/#telegram">
            <Button size="sm" variant="default" className="w-full sm:w-auto sm:hidden">
              <Bot />
              Telegram Bot
            </Button>
            <Button variant="default" className="hidden sm:inline-flex">
              <Bot />
              Launch Telegram Bot
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
