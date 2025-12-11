#!/usr/bin/env node

// Alternative funding methods when direct RPC airdrop is rate limited

const PUBLIC_KEY = '9nR26wQxwqi4qoHR5CUTNEc4Tbu7x6W625mXHbDEnBpu';

console.log('💧 Solana Devnet Funding Options');
console.log('=================================\n');

console.log('🚰 Option 1: Official Solana Faucet');
console.log('Visit: https://faucet.solana.com');
console.log(`Paste address: ${PUBLIC_KEY}`);
console.log('Request: 2-5 SOL\n');

console.log('🚰 Option 2: QuickNode Faucet');
console.log('Visit: https://faucet.quicknode.com/solana/devnet');
console.log(`Paste address: ${PUBLIC_KEY}`);
console.log('Request: 2 SOL\n');

console.log('🚰 Option 3: SolFaucet');
console.log('Visit: https://solfaucet.com');
console.log(`Paste address: ${PUBLIC_KEY}`);
console.log('Request: 1 SOL\n');

console.log('⏰ Wait a few minutes then check balance with:');
console.log(`node scripts/test-keypair.mjs\n`);

console.log('🔄 Rate Limit Info:');
console.log('- RPC airdrops are limited to prevent abuse');
console.log('- Web faucets often have higher limits');
console.log('- Multiple small requests work better than large ones');
console.log('- Wait 24h to reset RPC airdrop limits');

// Check current balance
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function checkBalance() {
  try {
    const balance = await connection.getBalance(new PublicKey(PUBLIC_KEY));
    console.log(`\n💰 Current Balance: ${balance / 1000000000} SOL`);
  } catch (error) {
    console.log(`\n⚠️ Balance check failed: ${error.message}`);
  }
}

checkBalance();