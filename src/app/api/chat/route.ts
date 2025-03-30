import { NextRequest, NextResponse } from "next/server";
import genAI from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { knownLang, targetLang, level, message } = await req.json();

  const systemPrompt = `You are a friendly language tutor. The user knows ${knownLang} and wants to learn ${targetLang}. They are ${level} level. Start a scene-based conversation (like ordering food, greeting at airport, etc) in ${targetLang}. Only correct user gently when they make mistakes.`;

  const prompt = `${systemPrompt}\n\nUser: ${message}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "Failed to get response from Gemini" },
      { status: 500 }
    );
  }
}
