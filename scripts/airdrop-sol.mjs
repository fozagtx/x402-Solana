#!/usr/bin/env node
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Airdrop SOL to a given address on devnet (default).
 *
 * Usage:
 *   pnpm airdrop:solana --address <publicKey> [--amount 1] [--rpc https://api.devnet.solana.com]
 */

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    address: undefined,
    amount: 1,
    rpc: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--address" && args[i + 1]) {
      params.address = args[i + 1];
      i++;
    } else if (arg === "--amount" && args[i + 1]) {
      params.amount = parseFloat(args[i + 1]);
      i++;
    } else if (arg === "--rpc" && args[i + 1]) {
      params.rpc = args[i + 1];
      i++;
    }
  }

  if (!params.address) {
    throw new Error("Missing --address <publicKey>");
  }
  if (Number.isNaN(params.amount) || params.amount <= 0) {
    throw new Error("Invalid --amount. Provide a positive number.");
  }

  return params;
}

async function main() {
  try {
    const { address, amount, rpc } = parseArgs();
    const connection = new Connection(rpc, "confirmed");
    const pubkey = new PublicKey(address);
    console.log(`Requesting airdrop of ${amount} SOL to ${pubkey.toBase58()} on ${rpc}...`);

    const sig = await connection.requestAirdrop(pubkey, Math.floor(amount * LAMPORTS_PER_SOL));
    const latest = await connection.getLatestBlockhash();
    await connection.confirmTransaction(
      { signature: sig, ...latest },
      "confirmed"
    );

    const balance = await connection.getBalance(pubkey);
    console.log(`Airdrop confirmed. New balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Signature: ${sig}`);
  } catch (error) {
    console.error("Airdrop failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
