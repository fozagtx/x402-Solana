#!/usr/bin/env node
import { Keypair } from "@solana/web3.js";

/**
 * Utility: Generate a Solana keypair for devnet/local testing.
 * Outputs public key plus secret key (base64 + raw array) so you can import into a wallet or env.
 *
 * Important: Keep the secret key safe. Do NOT commit it to git or share it.
 */

const keypair = Keypair.generate();

const publicKey = keypair.publicKey.toBase58();
const secretKeyBase64 = Buffer.from(keypair.secretKey).toString("base64");
const secretKeyArray = Array.from(keypair.secretKey);

console.log("=== Solana Dev Keypair (do not commit) ===");
console.log(`Public Key: ${publicKey}`);
console.log(`Secret Key (base64): ${secretKeyBase64}`);
console.log(`Secret Key (Uint8Array JSON): ${JSON.stringify(secretKeyArray)}`);
console.log(
  "\nNotes: Use the public key for funding/receiving. Keep the secret key private. For devnet, airdrop SOL via `solana airdrop 1 <publicKey>`."
);
