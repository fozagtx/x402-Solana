"use client";

import { ArrowRight, Wallet, Zap, CheckCircle, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const steps = [
  {
    number: 1,
    title: "The agent requests payment",
    description: "Client agent sends an x402 request with item, amount, and merchant metadata.",
    icon: Wallet,
  },
  {
    number: 2,
    title: "User approves & signs",
    description: "User signs the transaction in Phantom/Solflare or via programmatic signing.",
    icon: CheckCircle,
  },
  {
    number: 3,
    title: "Solana processes the transaction",
    description: "Fast finality and cheap fees make it instant for AI-driven commerce.",
    icon: Zap,
  },
  {
    number: 4,
    title: "Merchant agent receives confirmation",
    description: "The merchant agent verifies the signature and continues the workflow.",
    icon: Package,
  },
];

export function HowItWorks() {
  const cardShell =
    "border border-black/20 bg-white/50 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.12)]";

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 container px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
          How It <i className="font-light">Works</i>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-black/70 text-balance max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          A simple 4-step process for autonomous agent-to-agent commerce
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.number} className={`${cardShell} relative`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-serif text-black/20">{step.number}</span>
                </div>
                <CardTitle className="text-lg sm:text-xl font-serif text-black">{step.title}</CardTitle>
                <CardDescription className="font-mono text-xs sm:text-sm text-black/70">
                  {step.description}
                </CardDescription>
              </CardHeader>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-primary/50" />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Card className={`${cardShell} inline-block max-w-full sm:max-w-none`}>
          <CardContent className="p-4 sm:p-6">
            <p className="font-mono text-xs sm:text-sm text-black/70">
              Issue item • Return digital asset • Unlock service • Provide receipt
            </p>
            <p className="font-serif text-lg sm:text-xl mt-2 text-blue-600">Everything is automated.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
