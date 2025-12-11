"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Bot } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col min-h-svh justify-center px-6 pt-36 pb-24">
      <div className="text-center relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-black mb-8 max-w-4xl mx-auto">
          x402 meets solana <br />
          <span className="font-light italic">AI-Powered Payments for the Autonomous Web</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Experience real on-chain payments, autonomous agents, and decentralized commerce - all powered by Solana, x402, MCP tools, and the Google ADK. Build, test, and deploy AI agents that can transact, charge, and verify payments - automatically.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
          <Link className="contents max-sm:hidden" href="/#demo">
            <Button>
              <ArrowRight />
              Start Building
            </Button>
          </Link>
          <Link className="contents max-sm:hidden" href="/docs">
            <Button variant="default">
              <BookOpen />
              Explore Documentation
            </Button>
          </Link>
          <Link className="contents max-sm:hidden" href="/#telegram">
            <Button variant="default">
              <Bot />
              Launch Telegram Bot
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 sm:hidden">
          <Link className="contents" href="/#demo">
            <Button size="sm">
              Start Building
            </Button>
          </Link>
          <Link className="contents" href="/docs">
            <Button size="sm" variant="default">
              Docs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
