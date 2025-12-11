"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Music, Building2 } from "lucide-react";

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      {/* Solana Integration Card */}
      <Card className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="font-serif text-lg sm:text-xl text-black flex items-center gap-2">
              <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              Solana Integration
            </CardTitle>
            <div className="flex gap-2">
              <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              <Music className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-black font-bold">•</span>
              <span>Real x402 payments on Solana devnet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black font-bold">•</span>
              <span>Automatic SOL airdrop</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* AI Tools Card */}
      <Card className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="font-serif text-lg sm:text-xl text-black flex items-center gap-2">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              AI Tools
            </CardTitle>
            <div className="flex gap-2">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              <div className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-400 rounded flex items-center justify-center">
                <span className="text-[8px] text-gray-600">2</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-black font-bold">•</span>
              <span>MCP server with Solana account utilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black font-bold">•</span>
              <span>Payment testing tools</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

