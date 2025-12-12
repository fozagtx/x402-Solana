"use client";

import { Bot, MessageSquare, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function TelegramSection() {
  const cardShell =
    "border border-black/20 bg-white/50 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.12)]";

  return (
    <section id="telegram" className="py-12 sm:py-16 lg:py-24 container px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
          Your Agents - <i className="font-light">Now on Telegram</i>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-black/70 text-balance max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          Deploy your AI agents directly into conversations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Card className={cardShell}>
          <CardHeader>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-serif text-black">Telegram Bot Integration</CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
              Full-featured bot for autonomous commerce
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm text-black/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Place orders directly from Telegram</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Approve/pay invoices inside Telegram</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Receive receipts & explorer links</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Merchant dashboard notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Supports inline buttons & deep links</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Full wallet authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Optional custodial flow for low-value items</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button variant="default" size="sm" className="flex-1 justify-center sm:text-xs">
                <MessageSquare className="w-4 h-4" />
                <span className="truncate">Demo Bot</span>
              </Button>
              <Button variant="default" size="sm" className="flex-1 justify-center sm:text-xs">
                <ExternalLink className="w-4 h-4" />
                <span className="truncate">Webhooks</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={cardShell}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black font-serif">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Bot Commands
            </CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
              Available commands for merchants and users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
              <div className="border-l-2 border-blue-600 pl-3 sm:pl-4">
                <div className="text-blue-600 font-semibold">/start</div>
                <div className="text-black/60 mt-1">Authenticate and link wallet</div>
              </div>
              <div className="border-l-2 border-blue-600 pl-3 sm:pl-4">
                <div className="text-blue-600 font-semibold">/balance</div>
                <div className="text-black/60 mt-1">Check your Solana balance</div>
              </div>
              <div className="border-l-2 border-blue-600 pl-3 sm:pl-4">
                <div className="text-blue-600 font-semibold">/transactions</div>
                <div className="text-black/60 mt-1">View transaction history</div>
              </div>
              <div className="border-l-2 border-blue-600 pl-3 sm:pl-4">
                <div className="text-blue-600 font-semibold">/payouts</div>
                <div className="text-black/60 mt-1">Manage merchant payouts</div>
              </div>
              <div className="border-l-2 border-blue-600 pl-3 sm:pl-4">
                <div className="text-blue-600 font-semibold">/catalog</div>
                <div className="text-black/60 mt-1">Browse available items</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
