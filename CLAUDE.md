# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Main Application Commands
```bash
# Development
pnpm install               # Install dependencies
pnpm dev                   # Start Next.js development server
pnpm build                 # Build for production ✅ Working
pnpm start                 # Start production server
pnpm lint                  # Run ESLint (warnings only, build succeeds)

# SDK Commands
pnpm sdk:build             # Build SDK (cd sdk && npx tsc)
pnpm sdk:lint              # Lint SDK code

# Database Operations
pnpm prisma generate       # Generate Prisma client (run after schema changes)
pnpm prisma migrate dev    # Create and apply migrations
pnpm prisma studio         # Open database GUI
pnpm prisma migrate reset  # Reset database (⚠️ deletes all data)
```

### Build Status
✅ **Build is working** - The project builds successfully with some warnings
- ESLint rules have been relaxed to warnings to allow development
- Missing dependencies have been handled gracefully with fallbacks
- @google/adk dependency is optional and has mock implementation

### SDK Testing
```bash
cd sdk
npm test                   # Run vitest tests
npm run build             # Build SDK for publishing
```

## Architecture Overview

This is a **Solana-based AI payment platform** that enables autonomous agents to request, verify, and execute cryptocurrency payments using the x402 protocol.

### Key System Components

**Frontend Layer (Next.js 15 + React 19)**
- Landing page with Three.js particle effects and glassmorphism design
- Chat UI for agent interactions using Google ADK
- Payment flows with Solana wallet integration
- Dashboard for users and merchants

**Agent Layer (Google ADK Integration)**
- `ClientAgent` - Handles buyer-side payment requests
- `MerchantAgent` - Processes merchant-side invoice creation
- Agent sessions stored in database with trace events and artifacts
- MCP (Model Context Protocol) integration for agent tools

**API Layer (Next.js API Routes)**
- `/api/v1/*` - RESTful API for invoices, webhooks, agents
- `/api/auth/*` - NextAuth.js authentication (email/OAuth)
- `/api/mcp/*` - MCP server endpoints for agent tooling
- `/api/telegram/webhook` - Telegram bot integration

**Business Logic**
- **x402 Protocol**: Machine-readable payment requests with nonce-based replay protection
- **Invoice Management**: PENDING → PAID → SETTLED status tracking with expiry
- **Payment Verification**: On-chain Solana transaction verification
- **Webhook System**: Real-time payment notifications

**Data Layer (Prisma + SQLite)**
- Users, Merchants, Invoices, Wallets, ApiKeys
- Agent sessions and webhook configurations
- Nonce management for payment security

### Solana Integration Architecture

**Wallet Support**: Phantom, Solflare, Ledger via @solana/wallet-adapter
**Token Support**: USDC SPL tokens (configurable per merchant)
**Transaction Flow**: Invoice → Transaction Builder → Wallet Signing → On-chain Verification

### SDK Architecture (`@fozagtx/x402-sdk`)

Published as npm package for external integration:
- **Invoice Helpers**: `createInvoice()`, `watchInvoice()` with retry/backoff
- **Wallet Abstraction**: Signer abstraction with auto-detection
- **Error Handling**: Structured `X402Error` classes
- **Examples**: Node.js devnet flow + browser wallet demo

## Critical Implementation Details

### Payment Security Model
- **Nonces**: Unique per invoice to prevent replay attacks
- **Expiry**: All invoices have time-based expiration
- **Verification**: On-chain transaction signature verification
- **Rate Limiting**: API key-based rate limiting (default 1000/period)

### Agent State Management
- Agent sessions persist trace events, artifacts, and state as JSON
- ADK client creates isolated agent instances per user/merchant
- MCP tools provide structured capabilities for payment operations

### Database Schema Patterns
- All models use `cuid()` IDs for better performance
- Soft cascading deletes via Prisma relations
- Indexed fields for query performance (merchantId, status, createdAt)
- JSON columns for flexible metadata storage

## Development Patterns

### Component Organization
- `components/ui/` - Shadcn/ui components
- `components/auth/` - Authentication components
- `components/wallet/` - Solana wallet integration
- `components/flows/` - Payment flow components
- `components/chat/` - Agent chat interface

### Library Structure
- `lib/adk/` - Google ADK integration
- `lib/solana/` - Solana blockchain utilities
- `lib/x402/` - x402 protocol implementation
- `lib/auth/` - NextAuth.js configuration
- `lib/db/` - Prisma database client
- `lib/observability/` - Logging and metrics

### API Design Patterns
- RESTful design with consistent error responses
- JSON request/response bodies with Zod validation
- Middleware for authentication and rate limiting
- Webhook payload signing for security

## Environment Setup Requirements

### Required Environment Variables
```bash
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
SOLANA_CLUSTER="devnet"  # or "mainnet-beta"
SOLANA_RPC_URL="https://api.devnet.solana.com"
```

### Optional Environment Variables
```bash
# OAuth (for social login)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Telegram Bot
TELEGRAM_BOT_TOKEN=""
TELEGRAM_WEBHOOK_URL=""
```

## Testing Strategy

### SDK Testing
- Vitest for unit tests in `/sdk/__tests__/`
- Test invoice creation, payment watching, error handling
- Mock Solana RPC calls for deterministic testing

### Integration Testing Approach
- Test payment flows end-to-end with devnet
- Verify agent session persistence
- Test webhook delivery and retry logic
- Validate Solana transaction building and signing

## Deployment Considerations

### Production Environment
- Use PostgreSQL instead of SQLite for production
- Set `SOLANA_CLUSTER="mainnet-beta"` for real payments
- Configure proper OAuth secrets for social login
- Set up webhook endpoint HTTPS URLs

### Database Migrations
- Run `pnpm prisma migrate deploy` in production
- Always backup before schema changes
- Test migrations on staging with production data copy

## Common Development Tasks

### Adding New Agent Tools
1. Create tool definition in `lib/adk/tools.ts`
2. Register tool in `lib/adk/google/tool-registry.ts`
3. Implement tool handler in appropriate agent class
4. Add tool to MCP server endpoints in `app/api/mcp/`

### Adding New Payment Methods
1. Extend merchant schema in `prisma/schema.prisma`
2. Update `lib/solana/` token handling
3. Modify transaction builder for new token type
4. Update SDK to support new payment method

### Extending Webhook Events
1. Add event type to `Webhook` model events field
2. Implement event emission in payment/invoice logic
3. Add webhook delivery logic in `lib/observability/`
4. Update API documentation and SDK types