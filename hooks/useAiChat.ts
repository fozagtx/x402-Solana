import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, PaymentStatus } from "@/components/chat-dashboard/chat-types";
import type { X402PaymentRequest } from "@/lib/x402/types";

type ChatPayloadMessage = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGE: ChatMessage = {
  id: "agent-welcome",
  role: "agent",
  type: "text",
  content: "Welcome to x402Solana. Ask me to buy something or run a payment workflow on Solana.",
  createdAt: new Date().toISOString(),
};

function buildHistory(messages: ChatMessage[]): ChatPayloadMessage[] {
  return messages
    .filter((msg) => msg.type === "text")
    .slice(-10)
    .map((msg) => ({
      role: msg.role === "agent" ? "assistant" : "user",
      content: msg.content,
    }));
}

function createInvoiceFromIntent(intent: string): X402PaymentRequest {
  const recipient =
    process.env.NEXT_PUBLIC_MERCHANT_ADDRESS ||
    "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";

  const token =
    process.env.NEXT_PUBLIC_PAYMENT_TOKEN ||
    process.env.NEXT_PUBLIC_DEFAULT_TOKEN_USDC ||
    "SOL";

  const amount = process.env.NEXT_PUBLIC_PAYMENT_AMOUNT || "0.1";

  return {
    invoiceId: `inv-${Date.now()}`,
    amount,
    token,
    recipient,
    nonce: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    metadata: {
      intent,
      source: "ai-sdk",
    },
  };
}

function shouldCreateInvoice(text: string): boolean {
  const lowered = text.toLowerCase();
  return (
    lowered.includes("buy") ||
    lowered.includes("purchase") ||
    lowered.includes("pay") ||
    lowered.includes("invoice")
  );
}

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady] = useState(true);
  const messagesRef = useRef<ChatMessage[]>([INITIAL_MESSAGE]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      type: "text",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setError(null);

    try {
      const history = buildHistory([...messagesRef.current, userMessage]);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error("Chat service unavailable");
      }

      const data = (await res.json()) as { reply?: string; error?: string };
      const replyText = data.reply || data.error || "No response received.";

      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: "agent",
        type: "text",
        content: replyText,
        createdAt: new Date().toISOString(),
      };

      const nextMessages: ChatMessage[] = [...messagesRef.current, agentMessage];

      if (shouldCreateInvoice(trimmed)) {
        const invoice = createInvoiceFromIntent(trimmed);
        nextMessages.push({
          id: `invoice-${invoice.invoiceId}`,
          role: "agent",
          type: "payment",
          content: `Payment required: ${invoice.amount} ${invoice.token}`,
          createdAt: new Date().toISOString(),
          payment: {
            invoice,
            status: "pending",
          },
        });
      }

      setMessages(nextMessages);
    } catch (err: any) {
      console.error("Chat error", err);
      setError(err?.message || "Failed to send message");
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "system",
          type: "text",
          content: "Agent unavailable. Please try again.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const updatePaymentStatus = useCallback((invoiceId: string, status: PaymentStatus) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.type === "payment" && msg.payment.invoice.invoiceId === invoiceId) {
          return {
            ...msg,
            payment: {
              ...msg.payment,
              status,
            },
          };
        }
        return msg;
      })
    );
  }, []);

  const handlePaymentSuccess = useCallback(
    (invoiceId: string, signature: string) => {
      updatePaymentStatus(invoiceId, "confirmed");
      setMessages((prev) => [
        ...prev,
        {
          id: `receipt-${invoiceId}`,
          role: "agent",
          type: "text",
          content: `Payment confirmed with signature ${signature}.`,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [updatePaymentStatus]
  );

  const handlePaymentError = useCallback(
    (invoiceId: string, message: string) => {
      updatePaymentStatus(invoiceId, "failed");
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${invoiceId}`,
          role: "agent",
          type: "text",
          content: `Payment failed: ${message}`,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [updatePaymentStatus]
  );

  return {
    messages,
    isProcessing,
    isReady,
    error,
    sendMessage,
    clearError: () => setError(null),
    updatePaymentStatus,
    handlePaymentSuccess,
    handlePaymentError,
  };
}
