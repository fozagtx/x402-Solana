"use client";

import Link from "next/link";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { ArrowRight, BookOpen, Bot } from "lucide-react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-between">

      <div className="pb-16 mt-auto text-center relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-black mb-8 max-w-4xl mx-auto">
          x402 meets solana <br />
          <span className="font-light italic">AI-Powered Payments for the Autonomous Web</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Experience real on-chain payments, autonomous agents, and decentralized commerce — all powered by Solana, x402, MCP tools, and the Google ADK. Build, test, and deploy AI agents that can transact, charge, and verify payments — automatically.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
          <Link className="contents max-sm:hidden" href="/#demo">
            <Button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <ArrowRight />
              Start Building
            </Button>
          </Link>
          <Link className="contents max-sm:hidden" href="/docs">
            <Button
              variant="default"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <BookOpen />
              Explore Documentation
            </Button>
          </Link>
          <Link className="contents max-sm:hidden" href="/#telegram">
            <Button
              variant="default"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Bot />
              Launch Telegram Bot
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 sm:hidden">
          <Link className="contents" href="/#demo">
            <Button
              size="sm"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Start Building
            </Button>
          </Link>
          <Link className="contents" href="/docs">
            <Button
              size="sm"
              variant="default"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
