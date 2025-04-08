import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  headers: {
    'anthropic-beta': 'token-efficient-tools-2025-02-19'
  }
});

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const model = anthropic('claude-3-7-sonnet-20250219');
  const result = streamText({
    model: model,
    messages: messages,
  });

  return result.toDataStreamResponse();
}