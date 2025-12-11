export interface Invoice {
  id: string;
  merchantId: string;
  merchantName?: string;
  amount: string;
  token: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled' | 'settled';
  txSignature?: string;
  expiresAt: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
  nonce: string;
}

export interface CreateInvoiceParams {
  merchantId: string;
  amount: string;
  token?: string;
  metadata?: Record<string, unknown>;
}

export interface ListInvoicesParams {
  merchantId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}
