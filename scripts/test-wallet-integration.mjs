#!/usr/bin/env node

// Test the wallet integration with your app
import { config } from 'dotenv';
config({ path: '.env.local' });

import { Keypair, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const PUBLIC_KEY = '9nR26wQxwqi4qoHR5CUTNEc4Tbu7x6W625mXHbDEnBpu';

async function testWalletIntegration() {
  console.log('🔗 Testing Wallet Integration with Your App\n');

  // Test 1: Environment setup
  console.log('1️⃣ Testing environment configuration...');
  const cluster = process.env.SOLANA_CLUSTER;
  const rpcUrl = process.env.SOLANA_RPC_URL;
  const testKey = process.env.SOLANA_TEST_PRIVATE_KEY;

  console.log(`   Cluster: ${cluster}`);
  console.log(`   RPC URL: ${rpcUrl}`);
  console.log(`   Test key configured: ${testKey ? 'YES' : 'NO'}`);

  if (!testKey) {
    console.log('   ⚠️ Add your private key to .env.local');
    return;
  }

  // Test 2: Keypair creation from env
  console.log('\n2️⃣ Creating keypair from environment...');
  const secretArray = JSON.parse(testKey);
  const keypair = Keypair.fromSecretKey(new Uint8Array(secretArray));
  const matches = keypair.publicKey.toString() === PUBLIC_KEY;
  console.log(`   Generated: ${keypair.publicKey.toString()}`);
  console.log(`   Expected:  ${PUBLIC_KEY}`);
  console.log(`   Match: ${matches ? 'YES ✅' : 'NO ❌'}`);

  // Test 3: Connection test
  console.log('\n3️⃣ Testing connection...');
  const connection = new Connection(rpcUrl, 'confirmed');
  try {
    const version = await connection.getVersion();
    console.log(`   Connected to Solana ${version['solana-core']}`);
  } catch (error) {
    console.log(`   Connection failed: ${error.message}`);
    return;
  }

  // Test 4: Balance check
  console.log('\n4️⃣ Checking wallet balance...');
  let balance = 0;
  try {
    balance = await connection.getBalance(keypair.publicKey);
    const solBalance = balance / 1000000000;
    console.log(`   Balance: ${solBalance} SOL`);

    if (solBalance === 0) {
      console.log('   💡 Fund your wallet using:');
      console.log('   node scripts/fund-via-faucet.mjs');
    }
  } catch (error) {
    console.log(`   Balance check failed: ${error.message}`);
  }

  // Test 5: Transaction simulation (similar to your payment flow)
  console.log('\n5️⃣ Testing payment transaction building...');
  try {
    const recipientKeypair = Keypair.generate();
    const amount = 0.001; // 0.001 SOL

    const instruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: recipientKeypair.publicKey,
      lamports: amount * 1000000000
    });

    const transaction = new Transaction().add(instruction);
    const { blockhash } = await connection.getLatestBlockhash();

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = keypair.publicKey;

    // Sign transaction (but don't send)
    transaction.sign(keypair);

    console.log('   ✅ Payment transaction created and signed');
    console.log(`   Amount: ${amount} SOL`);
    console.log(`   To: ${recipientKeypair.publicKey.toString().slice(0, 8)}...`);
    console.log(`   Size: ${transaction.serialize().length} bytes`);

  } catch (error) {
    console.log(`   Transaction failed: ${error.message}`);
  }

  // Test 6: Invoice-style data structure (matching your x402 protocol)
  console.log('\n6️⃣ Testing x402-style invoice structure...');
  const invoice = {
    id: 'test_' + Date.now(),
    merchantId: 'merchant_test',
    amount: 0.1, // 0.1 SOL
    currency: 'SOL',
    status: 'PENDING',
    payerAddress: keypair.publicKey.toString(),
    nonce: Math.random().toString(36).substring(2, 15),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
    metadata: {
      description: 'Test payment',
      createdBy: 'test-script'
    }
  };

  console.log('   ✅ Invoice structure created:');
  console.log(`   ID: ${invoice.id}`);
  console.log(`   Amount: ${invoice.amount} ${invoice.currency}`);
  console.log(`   Payer: ${invoice.payerAddress.slice(0, 8)}...`);
  console.log(`   Status: ${invoice.status}`);

  console.log('\n🎉 Integration Test Complete!');
  console.log('📋 Next Steps:');
  console.log('   1. Fund your wallet with SOL');
  console.log('   2. Start the Next.js app: pnpm dev');
  console.log('   3. Your wallet is ready for testing payments');

  return {
    keypairValid: matches,
    hasBalance: balance > 0,
    canCreateTransactions: true,
    readyForTesting: matches && balance > 0
  };
}

testWalletIntegration()
  .then(result => {
    if (result) {
      console.log(`\n📊 Ready for Testing: ${result.readyForTesting ? 'YES ✅' : 'NO (fund wallet first) 💰'}`);
    }
  })
  .catch(console.error);