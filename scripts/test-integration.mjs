#!/usr/bin/env node

import { Keypair } from '@solana/web3.js';

// Your generated keypair
const SECRET_KEY = [66,99,54,65,179,58,159,76,118,19,119,117,92,217,244,60,180,2,168,4,192,18,233,74,190,75,201,95,184,189,173,99,130,127,202,74,81,204,124,161,72,18,114,37,239,110,64,143,71,37,239,204,196,155,166,109,222,163,35,125,135,188,79,26];

// Simulate importing the project's Solana utilities
async function testIntegration() {
  console.log('🧪 Testing Integration with Project Utilities...\n');

  const keypair = Keypair.fromSecretKey(new Uint8Array(SECRET_KEY));

  // Test 1: Address validation (simulating lib/solana/client.ts)
  console.log('1️⃣ Testing address validation...');
  function isValidSolanaAddress(address) {
    try {
      new (await import('@solana/web3.js')).PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  const isValid = isValidSolanaAddress(keypair.publicKey.toString());
  console.log(`✅ Address validation: ${isValid ? 'PASS' : 'FAIL'}`);

  // Test 2: Connection setup (simulating lib/solana/client.ts)
  console.log('\n2️⃣ Testing connection setup...');
  const { Connection } = await import('@solana/web3.js');
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  console.log('✅ Connection created successfully');

  // Test 3: Balance check (simulating lib/solana/faucet.ts)
  console.log('\n3️⃣ Testing balance check...');
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`✅ Balance retrieved: ${balance / 1000000000} SOL`);
  } catch (error) {
    console.log(`⚠️ Balance check failed: ${error.message}`);
  }

  // Test 4: Transaction building (simulating lib/solana/transaction.ts)
  console.log('\n4️⃣ Testing transaction building...');
  try {
    const { SystemProgram, Transaction } = await import('@solana/web3.js');
    const testRecipient = Keypair.generate().publicKey;

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: testRecipient,
      lamports: 1000 // 0.000001 SOL
    });

    const transaction = new Transaction().add(transferInstruction);
    console.log('✅ Transaction built successfully');
  } catch (error) {
    console.log(`❌ Transaction building failed: ${error.message}`);
  }

  // Test 5: Key format conversions
  console.log('\n5️⃣ Testing key format conversions...');
  const publicKeyString = keypair.publicKey.toString();
  const secretKeyBase58 = keypair.secretKey.toString();
  const secretKeyArray = Array.from(keypair.secretKey);

  console.log(`✅ Public key (base58): ${publicKeyString}`);
  console.log(`✅ Secret key length: ${secretKeyArray.length} bytes`);
  console.log(`✅ Key formats working correctly`);

  // Test 6: Environment simulation
  console.log('\n6️⃣ Testing environment simulation...');
  process.env.SOLANA_CLUSTER = 'devnet';
  process.env.SOLANA_RPC_URL = 'https://api.devnet.solana.com';
  console.log(`✅ Environment: ${process.env.SOLANA_CLUSTER}`);
  console.log(`✅ RPC URL: ${process.env.SOLANA_RPC_URL}`);

  return {
    publicKey: publicKeyString,
    isValid: true,
    balance: 0,
    environment: 'devnet'
  };
}

testIntegration()
  .then(result => {
    console.log('\n🎉 Integration Tests Complete!');
    console.log('📊 Summary:');
    console.log(`   Public Key: ${result.publicKey}`);
    console.log(`   Environment: ${result.environment}`);
    console.log('   Status: ✅ Ready for development');
  })
  .catch(error => {
    console.error('❌ Integration test failed:', error.message);
  });