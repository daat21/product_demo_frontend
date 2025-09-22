import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Reads from env to allow custom model gateway
const baseURL = process.env.CUSTOM_MODEL_BASE_URL; // e.g. https://api.your-gateway.com/v1
const apiKey = process.env.CUSTOM_MODEL_API_KEY; // secret key
const modelName = process.env.CUSTOM_MODEL_NAME || "gpt-4o-mini"; // fallback

const openai = createOpenAI({
  apiKey,
  baseURL,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Accept only text messages; support UIMessage format from @ai-sdk/react
    const uiMessages = Array.isArray(body?.messages) ? body.messages : [];
    const extractText = (m: any): string => {
      if (typeof m?.content === "string") return m.content;
      const parts = Array.isArray(m?.parts) ? m.parts : [];
      return parts
        .filter((p: any) => p && (p.type === "text" || p.type === "reasoning"))
        .map((p: any) => p.text)
        .filter((t: any) => typeof t === "string")
        .join("\n");
    };
    const textOnlyMessages = uiMessages.map((m: any) => ({
      role: m.role,
      content: extractText(m) || "",
    }));

    // If only baseURL is provided (no apiKey/model), proxy to raw endpoint
    if (
      baseURL &&
      !apiKey &&
      (!process.env.CUSTOM_MODEL_NAME ||
        process.env.CUSTOM_MODEL_NAME.trim() === "")
    ) {
      const upstream = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: textOnlyMessages }),
      });

      if (!upstream.ok || !upstream.body) {
        return new Response(
          JSON.stringify({ error: "Upstream request failed" }),
          {
            status: upstream.status || 502,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Stream plain text back to client
      return new Response(upstream.body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Default: use OpenAI-compatible provider via AI SDK
    const result = await streamText({
      model: openai(modelName),
      messages: textOnlyMessages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
