import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import crypto from 'crypto';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export async function POST(req: NextRequest) {
  try {
    const { publicKey, signature, nonce } = await req.json();

    if (!publicKey || !signature || !nonce) {
      return NextResponse.json(
        { error: 'Public key, signature, and nonce are required' },
        { status: 400 }
      );
    }

    // Hash the nonce
    const nonceHash = crypto.createHash('sha256').update(nonce).digest('hex');

    // Find and verify nonce
    const storedNonce = await db.walletNonce.findUnique({
      where: { nonceHash },
    });

    if (!storedNonce) {
      return NextResponse.json(
        { error: 'Invalid or expired nonce' },
        { status: 401 }
      );
    }

    // Check if nonce is expired
    if (storedNonce.expiresAt < new Date()) {
      await db.walletNonce.delete({ where: { nonceHash } });
      return NextResponse.json(
        { error: 'Nonce has expired' },
        { status: 401 }
      );
    }

    // Check if nonce was already consumed
    if (storedNonce.consumedAt) {
      return NextResponse.json(
        { error: 'Nonce already used' },
        { status: 401 }
      );
    }

    // Verify wallet owns the public key by checking signature
    const message = `Sign this message to authenticate with x402Solana:\n\nNonce: ${nonce}`;
    const messageBytes = new TextEncoder().encode(message);
    const publicKeyBytes = bs58.decode(publicKey);
    const signatureBytes = bs58.decode(signature);

    const verified = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Mark nonce as consumed
    await db.walletNonce.update({
      where: { nonceHash },
      data: { consumedAt: new Date() },
    });

    // Find or create user with this wallet
    let user = await db.user.findFirst({
      where: {
        wallets: {
          some: {
            address: publicKey,
          },
        },
      },
      include: {
        wallets: true,
      },
    });

    if (!user) {
      // Create new user with wallet
      user = await db.user.create({
        data: {
          email: `${publicKey.slice(0, 8)}@wallet.local`,
          name: `User ${publicKey.slice(0, 8)}`,
          wallets: {
            create: {
              address: publicKey,
              network: 'solana',
            },
          },
        },
        include: {
          wallets: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        walletAddress: publicKey,
      },
    });
  } catch (error) {
    console.error('Error verifying wallet:', error);
    return NextResponse.json(
      { error: 'Failed to verify wallet signature' },
      { status: 500 }
    );
  }
}
