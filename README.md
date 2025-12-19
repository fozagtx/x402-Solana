# 🌊 x402Solana - AI-Powered Payments for the Autonomous Web

<div align="center">

![x402Solana](https://img.shields.io/badge/x402Solana-x402-blue?style=for-the-badge&logo=solana)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Web3-purple?style=for-the-badge&logo=solana)

**Experience real on-chain payments, autonomous agents, and decentralized commerce - all powered by Solana, x402, MCP tools, and the Vercel AI SDK (OpenAI).**

[Features](#-features) • [Quick Start](#-quick-start) • [SDK Usage](#-sdk-usage) • [Contributing](#-contributing)

</div>

---

## 🎥 Demo

Watch the demo: [https://youtu.be/FMATquoDmS4](https://youtu.be/FMATquoDmS4)

---

## Overview

**x402Solana** is a complete platform for AI-powered payments on Solana using the x402 payment protocol, the Vercel AI SDK (OpenAI), and autonomous agents. The platform enables AI agents to request, verify, and execute cryptocurrency payments in real-time - facilitating true agent-to-agent commerce.

### Key Capabilities

- **Autonomous Agents**: Build AI agents that can transact, charge, and verify payments automatically
- **x402 Protocol**: Machine-verifiable payment requests designed for AI ↔ AI commerce
- **Solana Integration**: Fast, cheap transactions with USDC SPL token support
- **AI Agent Integration**: Vercel AI SDK + OpenAI backing the chat agent
- **Telegram Bot**: Deploy agents directly into Telegram conversations
- **Developer SDK**: JavaScript/TypeScript SDK for easy integration

---

## ✨ Features

- **x402 Payment Protocol**: Invoice creation, payment requests, and verification
- **Solana Integration**: Transaction creation, signing, and on-chain verification
- **AI Agent Integration**: Client and merchant agent templates with chat UI (OpenAI via Vercel AI SDK)
- **Authentication**: NextAuth.js with email/password
- **User & Merchant Dashboards**: Profile, API keys, wallet management, and transaction tracking
- **Telegram Bot**: Webhook handler for Telegram integration
- **SDK**: JavaScript/TypeScript SDK for easy integration ([npm package](https://www.npmjs.com/package/@fozagtx/x402-sdk))
- **Modern UI**: Glassmorphism design with Three.js particle effects
- **Security**: Noncustodial wallet signing, anti-replay protection, invoice expiry
- **Analytics**: Payment metrics, success rates, confirmation times

---

## 📚 Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, Radix UI  
**Blockchain:** Solana Web3.js, SPL Token, Wallet Adapter  
**Backend:** Node.js, Prisma, NextAuth.js, SQLite  
**AI:** Vercel AI SDK (OpenAI)  
**Tools:** Zod, Zustand, React Query, Lucide Icons

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fozagtx/x402solana.git
cd x402solana
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file:
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# Solana
SOLANA_CLUSTER="devnet"
SOLANA_RPC_URL="https://api.devnet.solana.com"

# OpenAI (optional, for AI agent features)
OPENAI_API_KEY="your-openai-api-key"
```

4. **Set up the database**
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Open Prisma Studio
pnpm prisma studio
```

5. **Start the development server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

---

## 🧪 Devnet Testing

Quick scripts to get a funded devnet wallet for testing:
```bash
# Generate a new Solana keypair (prints public + secret; keep secret safe)
pnpm keygen:solana

# Airdrop SOL on devnet
pnpm airdrop:solana --address <YOUR_DEVNET_PUBLIC_KEY> --amount 1 --rpc https://api.devnet.solana.com
```

**Environment variables for devnet:**
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_MERCHANT_ADDRESS=<your devnet wallet>
NEXT_PUBLIC_PAYMENT_TOKEN=SOL
NEXT_PUBLIC_PAYMENT_AMOUNT=0.1
OPENAI_API_KEY=<your key>
```

After funding, connect your wallet in the chat page, ask to "buy something", and use the PayWithWallet prompt to run an on-chain transaction.

---

## 📦 SDK Usage

The TypeScript SDK is published as [`@fozagtx/x402-sdk`](https://www.npmjs.com/package/@fozagtx/x402-sdk).

### Installation
```bash
npm install @fozagtx/x402-sdk @solana/web3.js
# or
pnpm add @fozagtx/x402-sdk @solana/web3.js
```

### Basic Usage
```typescript
import { createSDK } from '@fozagtx/x402-sdk';

const sdk = createSDK({
  apiUrl: 'http://localhost:3000',
  apiKey: 'your-api-key',
});

// Create invoice
const invoice = await sdk.createInvoice({
  merchantId: 'merchant-123',
  amount: '1.0',
  token: 'USDC',
  metadata: {
    item: 'Digital Product',
    description: 'Premium access'
  }
});

// Watch invoice status
const unwatch = await sdk.watchInvoice(invoice.id, (status) => {
  console.log('Invoice status:', status);
});

// Stop watching
unwatch();
```

### Payment Flow Example
```typescript
// 1. Create invoice
const invoice = await sdk.createInvoice({
  merchantId: 'merchant-123',
  amount: '1.0',
  token: 'USDC',
});

// 2. Build transaction
const transaction = await sdk.buildTransaction({
  invoiceId: invoice.id,
  payer: wallet.publicKey,
});

// 3. Sign transaction
const signedTx = await wallet.signTransaction(transaction);

// 4. Submit transaction
const signature = await sdk.submitTransaction(signedTx);

// 5. Confirm payment
const confirmation = await sdk.confirmPayment(invoice.id, signature);
```

### AI Agent Integration
```typescript
import { createClient } from 'ai';
import { openai } from '@ai-sdk/openai';

const client = createClient({
  apiKey: process.env.OPENAI_API_KEY!,
});

const res = await client.chat({
  model: openai('gpt-4o-mini'),
  messages: [
    { role: 'system', content: 'You are a Solana payments agent.' },
    { role: 'user', content: 'Create an invoice for 5 USDC' }
  ],
});

console.log(res.text);
```

See the [`examples/`](./examples/) directory for more complete examples.

---

## 🔧 Development Commands
```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run linter

# Database
pnpm prisma generate  # Generate Prisma client
pnpm prisma migrate dev --name migration_name  # Create migration
pnpm prisma studio    # Open database GUI
pnpm prisma format    # Format Prisma schema

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

---

## 📁 Project Structure
```
x402solana/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── mcp/           # MCP server endpoints
│   │   ├── telegram/      # Telegram webhook
│   │   └── v1/            # API v1 endpoints
│   ├── chat/              # Chat dashboard page
│   ├── dashboard/         # User dashboard
│   ├── docs/              # Documentation pages
│   ├── merchant/          # Merchant dashboard
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── chat/              # Chat UI components
│   ├── auth/              # Authentication components
│   ├── wallet/            # Wallet integration
│   ├── flows/             # Payment flow components
│   └── ui/                # UI components (shadcn)
├── lib/                   # Library code
│   ├── scripts/           # Keygen + airdrop scripts
│   ├── solana/            # Solana integration
│   ├── x402/              # x402 protocol
│   ├── auth/              # Authentication config
│   ├── db/                # Database client
│   ├── sdk/               # SDK implementation
│   └── observability/     # Logging and metrics
├── prisma/                # Prisma schema
├── examples/              # Example applications
│   ├── buyer-webflow/     # Buyer agent example
│   ├── merchant-agent/    # Merchant agent example
│   └── telegram-bot/      # Telegram bot example
└── public/                # Static assets
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Production Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
SOLANA_CLUSTER="mainnet-beta"
SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
OPENAI_API_KEY="your-openai-key"
```

### Database Migration
```bash
# Run migrations in production
pnpm prisma migrate deploy
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Use semantic commit messages (feat:, fix:, docs:, etc.)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Solana](https://solana.com/) - The blockchain platform
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI SDK (OpenAI provider)
- [x402 Protocol](https://x402.dev/) - Payment Required Protocol
- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - The database toolkit

---

## 📞 Contact & Support

- **GitHub**: [@fozagtx](https://github.com/fozagtx)

---

<div align="center">

**Built with ❤️ by [fozagtx](https://github.com/fozagtx)**

[⭐ Star this repo](https://github.com/fozagtx/x402solana) • [🐛 Report Bug](https://github.com/fozagtx/x402solana/issues) • [✨ Request Feature](https://github.com/fozagtx/x402solana/issues)

</div>
