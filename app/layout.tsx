import type { Metadata } from "next";
import { Geist_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { FallingParticles } from "@/components/falling-particles";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "x402Solana — AI-Powered Payments for the Autonomous Web",
  description: "Experience real on-chain payments, autonomous agents, and decentralized commerce — all powered by Solana, x402, MCP tools, and the Google ADK.",
  generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${crimsonPro.variable} antialiased`}
        suppressHydrationWarning
      >
        <WalletProvider>
          <FallingParticles />
          <Header />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
