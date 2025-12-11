"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  BookOpen, 
  Code, 
  Bot, 
  FileText, 
  Settings, 
  Wallet, 
  Server, 
  Shield,
  Rocket,
  TestTube,
  Globe
} from "lucide-react";

const docSections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    description: "Introduction to x402 AI Starter Kit (Solana Edition)",
  },
  {
    id: "architecture",
    title: "Architecture & Components",
    icon: Code,
    description: "System architecture and component overview",
  },
  {
    id: "prerequisites",
    title: "Prerequisites",
    icon: Settings,
    description: "Required tools and dependencies",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    description: "Setup and deployment guide",
  },
  {
    id: "configuration",
    title: "Configuration & Environment Variables",
    icon: Settings,
    description: "Environment configuration guide",
  },
  {
    id: "solana",
    title: "Solana Integration & Wallet Flow",
    icon: Wallet,
    description: "Solana blockchain integration",
  },
  {
    id: "x402",
    title: "x402 Payment Protocol Explained",
    icon: FileText,
    description: "Understanding the x402 payment protocol",
  },
  {
    id: "mcp",
    title: "MCP Server & Agent Integration",
    icon: Server,
    description: "MCP server setup and agent integration",
  },
  {
    id: "api",
    title: "API Reference",
    icon: Code,
    description: "Complete API documentation",
  },
  {
    id: "examples",
    title: "Example Flows / Walkthroughs",
    icon: Bot,
    description: "Step-by-step examples and tutorials",
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    icon: TestTube,
    description: "Testing and debugging guide",
  },
  {
    id: "security",
    title: "Security Considerations",
    icon: Shield,
    description: "Security best practices",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: Globe,
    description: "Deployment instructions",
  },
];

const codeBlockStyles =
  "bg-gray-950 text-gray-100 border border-white/10 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-[0_18px_60px_rgba(0,0,0,0.2)]";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-sm">

      <div className="container py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* Quick Start Section */}
        <div className="mb-8 sm:mb-12">
          <Card className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300 transition-all duration-300 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-serif mb-2 text-black">Quick Start</h2>
                  <p className="text-sm sm:text-base text-black/70 mb-4">
                    Get started with the NPM SDK in minutes
                  </p>
                  <Link
                    href="/docs/quickstart"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border-2 border-gray-800 text-white hover:bg-gray-900 hover:border-gray-700 transition-all text-sm font-mono"
                  >
                    View Quick Start Guide
                    <Rocket className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table of Contents */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6 text-black">Table of Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {docSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.id}
                  href={`/docs#${section.id}`}
                  className="group"
                >
                  <Card className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300 hover:shadow-xl hover:shadow-gray-300/60 hover:-translate-y-1 transition-all duration-300 h-full shadow-lg shadow-gray-200/50">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg font-serif mb-1 text-black group-hover:text-black/80 transition-colors">
                            {section.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-black/70 line-clamp-2">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Overview Section */}
        <section id="overview" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">1. Overview</h2>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                The x402 AI Starter Kit (Solana Edition) is a reference application demonstrating how AI agents (built with an Agent Development Kit) can request and process payments using the x402 protocol and the Solana blockchain. The starter kit includes:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li>A Next.js web UI providing a friendly front-end for testing and interacting with agents.</li>
                <li>AI tools panel and pre-built agent flows (client/merchant patterns).</li>
                <li>An MCP (merchant control plane) server component for account provisioning and payment orchestration.</li>
                <li>Example integrations showing how to create, sign, and confirm Solana transactions (SOL / USDC) in response to x402 payment requests.</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
                This kit is ideal for developers building pay-to-use AI services, agent-to-agent commerce, or experimenting with decentralized payment coordination using x402 + Solana.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">2. Architecture & Components</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">High-level components:</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li><strong className="text-black">Next.js Frontend ( / )</strong>: UI for interacting with agents, quick actions (Check Solana account, Test x402 payment), model selector, and chat interface.</li>
                  <li><strong className="text-black">MCP Server ( /mcp )</strong>: Backend service that manages accounts, issues x402 requests, and orchestrates payment transactions for merchants.</li>
                  <li><strong className="text-black">ADK Agents</strong>: Client agent and merchant agent examples that run A2A (agent-to-agent) flows using the ADK library.</li>
                  <li><strong className="text-black">Solana Blockchain</strong>: The blockchain environment for production transactions on Solana mainnet.</li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Flow overview:</h3>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li>User interacts with the Frontend (eg. &ldquo;I want to buy banana&rdquo;).</li>
                  <li>Client Agent constructs an x402 payment request targeted at the Merchant Agent.</li>
                  <li>Merchant Agent responds with payment instructions (amount, token, address, or a prepared transaction).</li>
                  <li>Client signs and submits the transaction to Solana (via wallet / MCP helper / simulated signer).</li>
                  <li>Merchant confirms payment and completes the service.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section id="prerequisites" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">3. Prerequisites</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                Before you begin, install the following on your machine:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li>Node.js (v18+ recommended) and npm/yarn</li>
                <li>Git</li>
                <li>Docker (optional, useful for MCP server deployment)</li>
                <li>Solana CLI (for advanced blockchain interactions)</li>
                <li>A wallet integration (eg. Phantom or Solflare) for signing transactions</li>
              </ul>
              <div className="mt-6">
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Recommended dev tools:</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li>VS Code</li>
                  <li>Postman / Insomnia (for API testing)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">4. Getting Started</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">1. Clone the repo</h3>
                <pre className={codeBlockStyles}>
{`git clone <REPO_URL>
cd x402-ai-starter-kit`}
                </pre>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">2. Install dependencies</h3>
                <pre className={codeBlockStyles}>
{`# in the root directory (Next.js frontend)
npm install

# if MCP server has a separate package
cd mcp-server && npm install`}
                </pre>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">3. Configure environment variables</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">
                  See the Configuration section below for full details on the env variables. Configure your environment variables in your hosting platform or deployment environment.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">4. Deploy the application</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">Deploy the application to your hosting platform:</p>
                <ul className="space-y-1 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4 mb-4">
                  <li>Deploy Next.js frontend to Vercel or your preferred platform</li>
                  <li>Deploy MCP server to your backend infrastructure</li>
                  <li>Configure production environment variables</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">5. Configure agents</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">
                  Set up your ADK agents with production credentials and configuration. Agents will register in the ADK environment and can be invoked from the UI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Section */}
        <section id="configuration" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">5. Configuration & Environment Variables</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Frontend Environment Variables</h3>
                <pre className={codeBlockStyles}>
{`NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com # MCP server address
NEXT_PUBLIC_ADK_ENDPOINT=https://adk.yourdomain.com # ADK or agent endpoint
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_DEFAULT_TOKEN_USDC=USDC_MAINNET_MINT_ADDRESS`}
                </pre>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">MCP Server Environment Variables</h3>
                <pre className={codeBlockStyles}>
{`PORT=4000
SOLANA_CLUSTER=mainnet-beta
SOLANA_RPC=https://api.mainnet-beta.solana.com
USDC_MINT_ADDRESS=<USDC_MAINNET_MINT>`}
                </pre>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Agent configuration</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li><strong className="text-black">AGENT_ID / AGENT_TOKEN</strong> (ADK authentication)</li>
                  <li><strong className="text-black">MERCHANT_PUBLIC_KEY</strong>: the Solana address merchants use to receive payments</li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
                  <strong className="text-black">Keep secrets (private keys, service tokens) out of git and use environment variables or secret managers.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solana Integration Section */}
        <section id="solana" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">6. Solana Integration & Wallet Flow</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Supported Wallets</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                  The SDK supports 6 major Solana wallets with priority ranking:
                </p>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li><strong className="text-black">Phantom</strong> - Most popular Solana wallet</li>
                  <li><strong className="text-black">Solflare</strong> - Strong DeFi presence</li>
                  <li><strong className="text-black">Backpack</strong> - Essential for xNFT ecosystem</li>
                  <li><strong className="text-black">Glow</strong> - Light, fast, mobile-friendly</li>
                  <li><strong className="text-black">Slope</strong> - Popular in Asia markets</li>
                  <li><strong className="text-black">Ledger</strong> - Enterprise-grade hardware wallet</li>
                </ol>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Wallet Integration Architecture</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                  The wallet integration uses a <strong className="text-black">WalletSigner interface abstraction</strong> that decouples SDK logic from UI wallet adapter implementation. This ensures:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li>SDK works with any wallet implementing the interface</li>
                  <li>No direct wallet object dependencies</li>
                  <li>Clean separation of concerns</li>
                  <li>Easy testing and mocking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Wallet Connection Flow</h3>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li>Frontend detects installed wallets automatically</li>
                  <li>Wallet adapter ranks wallets by priority (Phantom → Solflare → Backpack → Glow → Slope → Ledger)</li>
                  <li>User selects wallet or auto-connects to highest priority</li>
                  <li>Wallet adapter provides WalletSigner interface to SDK</li>
                  <li>SDK uses signer for transaction signing</li>
                </ol>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Payment Flow with Wallets</h3>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li>AI agent generates x402 payment request</li>
                  <li>Frontend receives and displays payment confirmation dialog</li>
                  <li>SDK builds transaction from x402 payload (validates, computes ATA, adds memo)</li>
                  <li>Wallet signs transaction (user approves in wallet popup)</li>
                  <li>SDK submits transaction to Solana RPC</li>
                  <li>SDK waits for on-chain confirmation</li>
                  <li>Payment proof sent back to AI agent</li>
                  <li>Merchant agent verifies payment and completes order</li>
                </ol>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">USDC / Token flow</h3>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li>Merchant requests payment: 5 USDC to merchant_address.</li>
                  <li>Client prepares a token transfer or uses Solana Pay / associated token accounts.</li>
                  <li>Client signs the transfer and submits to Solana RPC.</li>
                  <li>Merchant watches the transaction signature; once confirmed, service is delivered.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* x402 Protocol Section */}
        <section id="x402" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">7. x402 Payment Protocol Explained</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                x402 is a lightweight extension of HTTP payment semantics for agent-to-agent commerce. The important concepts in starter kit context:
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li><strong className="text-black">Payment Request</strong>: An agent (merchant) responds to a service invocation with an x402 payment requirement (amount, token, target address, optional prepared transaction, expiration).</li>
                <li><strong className="text-black">Payment Response</strong>: The payer (client) either approves and signs a transaction, or returns a proof-of-payment after submission.</li>
                <li><strong className="text-black">Receipt/Confirmation</strong>: Merchant validates the transaction on-chain and completes the requested action.</li>
              </ul>
              <div className="mt-6">
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Typical fields in an x402 payload:</h3>
                <pre className={codeBlockStyles}>
{`{
  "amount": "5000",
  "currency": "USDC",
  "token_mint": "<USDC_MINT_ADDRESS>",
  "recipient": "<merchant_sol_address>",
  "memo": "x402-payment-for:banana-order-123",
  "expires_at": "2025-01-01T00:00:00Z",
  "prepared_tx": "<optional_base64_serialized_tx>"
}`}
                </pre>
                <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
                  <strong className="text-black">Prepared transaction mode</strong>: the merchant may provide a prepared transaction (unsigned or partially signed) for the payer to sign and submit.
                </p>
                <p className="text-sm sm:text-base text-gray-700 mt-2 leading-relaxed">
                  <strong className="text-black">Security note</strong>: Never rely solely on off-chain signals for payment completion; always validate on-chain confirmations and expected token amounts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MCP Server Section */}
        <section id="mcp" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">8. MCP Server & Agent Integration</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The MCP server exposes endpoints that agents and the frontend use for payment orchestration. Core endpoints include:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li><strong className="text-black">POST /prepare-payment</strong>: merchant requests the server prepare a transaction payload</li>
                <li><strong className="text-black">POST /validate-payment</strong>: merchant asks server to validate payment using transaction signature</li>
                <li><strong className="text-black">GET /health</strong>: service health check</li>
              </ul>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">MCP responsibilities</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li>Orchestrate payment transactions</li>
                  <li>Offer prepared transaction generation</li>
                  <li>Provide payment validation services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Agent interactions</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                  <li>Agents call MCP for payment orchestration and transaction preparation</li>
                  <li>Frontend triggers agent invocations via ADK endpoints; agents in turn orchestrate with MCP</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference Section */}
        <section id="api" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">9. API Reference</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">GET /health</h3>
                <p className="text-sm sm:text-base text-gray-700">Returns service health and Solana cluster connectivity.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">POST /prepare-payment</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2">Create a prepared transaction for token transfer</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Request:</p>
                <pre className={`${codeBlockStyles} mb-2`}>
{`{
  "from": "payerPubkey",
  "to": "merchantPubkey",
  "amount": "5",
  "mint": "USDC_MINT"
}`}
                </pre>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Response:</p>
                <pre className={codeBlockStyles}>
{`{ "preparedTxBase64": "...", "recentBlockhash": "..." }`}
                </pre>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">POST /validate-payment</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2">Validate a tx signature and token transfer</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Request:</p>
                <pre className={`${codeBlockStyles} mb-2`}>
{`{ "signature": "...", "expectedAmount": 5, "mint": "USDC_MINT" }`}
                </pre>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Response:</p>
                <pre className={codeBlockStyles}>
{`{ "status": "confirmed", "confirmedSlot": 12345 }`}
                </pre>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic">
                This is a compact reference; adapt to your actual code routes.
              </p>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">10. Example Flows / Walkthroughs</h2>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-black">Example 1 - Basic buyer flow (UI + Phantom wallet)</h3>
                <ol className="space-y-2 text-sm sm:text-base text-gray-700 list-decimal list-inside ml-4">
                  <li>User types in the UI: &ldquo;I want to buy banana&rdquo;.</li>
                  <li>Client agent constructs a purchase intent and asks merchant agent for price.</li>
                  <li>Merchant replies with x402 payment request: 5 USDC to merchantAddress.</li>
                  <li>Frontend opens Phantom signature modal with a token transfer transaction (or uses prepare-payment to get a prepared transaction).</li>
                  <li>User confirms and signs in Phantom; the tx is submitted to Solana.</li>
                  <li>Merchant observes the tx signature, validates token amount, and replies: &ldquo;Your order is being prepared&rdquo;.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Section */}
        <section id="testing" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">11. Testing & Debugging</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For monitoring and debugging, use the following approaches:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li>Monitor transactions via Solana Explorer</li>
                <li>Check MCP server logs for payment orchestration</li>
                <li>Use browser DevTools to inspect agent interactions</li>
                <li>Set up proper logging and monitoring infrastructure</li>
                <li>Use error tracking services for production issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">12. Security Considerations</h2>
            <div className="space-y-4 sm:space-y-6">
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li>Never use server signing in production; always require user wallet signatures</li>
                <li>Validate all on-chain transactions before completing services</li>
                <li>Use proper key management; never commit private keys to git</li>
                <li>Implement rate limiting on API endpoints</li>
                <li>Use HTTPS in production</li>
                <li>Validate payment amounts and recipients on-chain</li>
                <li>Implement proper error handling and logging</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deployment Section */}
        <section id="deployment" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">13. Deployment (Vercel & Production Tips)</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For deployment to Vercel or other platforms:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 list-disc list-inside ml-4">
                <li>Set all environment variables in your hosting platform</li>
                <li>Use production Solana cluster (mainnet-beta) for live services</li>
                <li>Configure proper CORS settings</li>
                <li>Set up monitoring and alerting</li>
                <li>Use environment-specific configuration</li>
                <li>Enable proper logging and error tracking</li>
                <li>Configure SSL/TLS certificates</li>
                <li>Set up CDN for static assets</li>
                <li>Implement rate limiting and DDoS protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contributing Section */}
        <section id="contributing" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">14. Contributing</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Contributions are welcome! Please follow the project&apos;s contribution guidelines and submit pull requests for any improvements.
            </p>
          </div>
        </section>

        {/* License Section */}
        <section id="license" className="mb-12 sm:mb-16 scroll-mt-20">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-6 text-black">15. License</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Please refer to the project&apos;s LICENSE file for license information.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
