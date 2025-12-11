import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const systemPrompt = `
You are x402Solana, an AI agent that helps users explore Solana payments, x402 invoices, and this starter kit.
Keep replies concise, actionable, and oriented toward Solana/x402 capabilities (create invoices, verify payments, connect wallets).
If users ask to buy something, outline the payment steps and remind them to approve the Solana transaction.
Never invent transaction signatures or private keys.
`;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 }
    );
  }

  try {
    const { messages = [] } = (await req.json()) as { messages?: ChatMessage[] };

    const chatMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user",
        content: m.content,
      })),
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenAI error: ${response.status} ${errBody}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm having trouble responding right now.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error", error);
    return NextResponse.json(
      { error: "Unable to process chat right now." },
      { status: 500 }
    );
  }
}
