# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes (marketing pages, chat dashboard, API handlers under `app/api`).
- `components/` + `hooks/`: Shared UI, chat, wallet, and GL effects used across pages.
- `lib/`: Domain logic (ADK integrations, Solana helpers, MCP router, observability, security), plus `sdk/` for the separately built TypeScript SDK.
- `prisma/`: Schema and migrations; `prisma.config.ts` expects `DATABASE_URL`.
- `public/`: Static assets; `styles/`: Tailwind/global styles; `docs/` and `examples/`: reference guides and runnable snippets.

## Build, Test, and Development Commands
- `pnpm install` (postinstall runs `prisma generate`).
- `pnpm dev`: Start the Next.js dev server.
- `pnpm build`: Production build; `pnpm start`: Serve the built app.
- `pnpm lint`: ESLint + Next rules across app and libs.
- `pnpm sdk:build` / `pnpm sdk:lint`: Build or lint the SDK package in `sdk/`.
- `pnpm prisma generate`: Regenerate Prisma client after schema edits; `pnpm prisma migrate dev --name <change>` to evolve the DB.

## Coding Style & Naming Conventions
- TypeScript/React with 2-space indentation; prefer `const`, explicit types, and avoid `any` per ESLint.
- Components in PascalCase; variables/functions camelCase; env keys UPPER_SNAKE_CASE. Keep file names kebab-case under feature folders (e.g., `chat-dashboard.tsx`).
- Run `pnpm lint --fix` before PRs; heed `@typescript-eslint` rules (no unused vars, prefer typed hooks).
- Tailwind-first styling; share design tokens via `components.json` and `styles/` when possible.

## Testing Guidelines
- No dedicated automated suite yet; add focused unit/integration tests beside modules (`*.test.ts[x]`) when touching business logic.
- For SDK work, prefer isolated tests or mocks for Solana RPC; use devnet endpoints via env to avoid mainnet impact.
- Manual validation remains required: `pnpm dev` → wallet connect → create/verify invoice; gate with `pnpm lint` and `pnpm build`.

## Commit & Pull Request Guidelines
- Recent history uses conventional-style prefixes (`fix:`, `docs:`, `chore:`); keep subjects concise and scoped.
- PRs should include: summary of behavior change, linked issue/task, testing commands run, UI screenshots when applicable, and callouts for schema/env updates (commit Prisma migrations when schema changes).
- Aim for small, focused diffs; keep SDK and app changes separated when possible.

## Security & Configuration Tips
- Keep secrets in `.env.local` (not versioned): `DATABASE_URL`, NextAuth secrets, Solana RPC URLs, wallet/keypairs for agents, Google ADK credentials.
- Configure prod secrets in Vercel/project settings; rotate keys if exposed.
- Prefer Solana devnet for local testing; never check in mainnet credentials or seed phrases.
