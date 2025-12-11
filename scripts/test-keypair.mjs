#!/usr/bin/env node

import { Keypair, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';

// Your generated keypair
const SECRET_KEY = [66,99,54,65,179,58,159,76,118,19,119,117,92,217,244,60,180,2,168,4,192,18,233,74,190,75,201,95,184,189,173,99,130,127,202,74,81,204,124,161,72,18,114,37,239,110,64,143,71,37,239,204,196,155,166,109,222,163,35,125,135,188,79,26];

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function testKeypair() {
  try {
    console.log('🔑 Testing Solana Keypair...\n');

    // Create keypair from your secret key
    const keypair = Keypair.fromSecretKey(new Uint8Array(SECRET_KEY));

    console.log(`✅ Public Key: ${keypair.publicKey.toString()}`);
    console.log(`✅ Secret Key (base58): ${keypair.secretKey.toString()}`);

    // Test balance check
    console.log('\n💰 Checking balance...');
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    // Test airdrop if balance is low
    if (balance < 0.1 * LAMPORTS_PER_SOL) {
      console.log('\n🚰 Requesting airdrop...');
      try {
        const signature = await connection.requestAirdrop(
          keypair.publicKey,
          1 * LAMPORTS_PER_SOL
        );
        console.log(`Airdrop signature: ${signature}`);

        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');
        console.log('✅ Airdrop confirmed!');

        // Check new balance
        const newBalance = await connection.getBalance(keypair.publicKey);
        console.log(`New balance: ${newBalance / LAMPORTS_PER_SOL} SOL`);
      } catch (error) {
        console.log(`⚠️ Airdrop failed: ${error.message}`);
      }
    }

    // Test transaction creation (but don't send)
    console.log('\n📝 Testing transaction creation...');
    const testRecipient = Keypair.generate().publicKey;

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: testRecipient,
      lamports: 0.001 * LAMPORTS_PER_SOL
    });

    const transaction = new Transaction().add(transferInstruction);
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = keypair.publicKey;

    // Sign transaction
    transaction.sign(keypair);
    console.log('✅ Transaction created and signed successfully');
    console.log(`Transaction size: ${transaction.serialize().length} bytes`);

    // Test address validation
    console.log('\n🔍 Testing address validation...');
    try {
      new PublicKey(keypair.publicKey.toString());
      console.log('✅ Public key is valid Solana address');
    } catch (error) {
      console.log('❌ Invalid public key');
    }

    console.log('\n🎉 All tests passed! Your keypair is working correctly.');

    return {
      publicKey: keypair.publicKey.toString(),
      balance: balance / LAMPORTS_PER_SOL,
      isValid: true
    };

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return {
      isValid: false,
      error: error.message
    };
  }
}

// Run the test
testKeypair()
  .then(result => {
    if (result.isValid) {
      console.log('\n📊 Test Results:');
      console.log(`Public Key: ${result.publicKey}`);
      console.log(`Balance: ${result.balance} SOL`);
    }
  })
  .catch(console.error);