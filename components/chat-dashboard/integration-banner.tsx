"use client";

import { Pill } from "@/components/pill";

export function IntegrationBanner() {
  return (
    <div className="flex justify-center">
      <Pill className="bg-green-50 border-2 border-green-200 text-green-800 shadow-lg shadow-green-200/50">
        <span className="inline-block size-2.5 rounded-full bg-green-500 mr-2 shadow-md shadow-green-500/50" />
        x402 Solana Integration Active
      </Pill>
    </div>
  );
}

