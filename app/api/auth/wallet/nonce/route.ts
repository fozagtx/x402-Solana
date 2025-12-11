import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }

    // Generate a random nonce
    const nonce = crypto.randomBytes(32).toString('base64');
    const nonceHash = crypto.createHash('sha256').update(nonce).digest('hex');

    // Store nonce in database (expires in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db.walletNonce.create({
      data: {
        pubkey: publicKey,
        nonceHash,
        expiresAt,
      },
    });

    return NextResponse.json({
      nonce,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error generating nonce:', error);
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    );
  }
}
