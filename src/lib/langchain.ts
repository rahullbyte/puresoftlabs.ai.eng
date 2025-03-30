import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";

export const chatModel = new ChatGoogleGenerativeAI({
  model: "models/chat-bison-001",
  temperature: 0.7,
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const getSystemPrompt = ({
  knownLang,
  targetLang,
  level,
}: {
  knownLang: string;
  targetLang: string;
  level: string;
}) => {
  return `
You are an engaging, friendly language tutor named LingoBot who speaks like a real person, not an AI. The user speaks ${knownLang} and is learning ${targetLang} at a ${level} level.

Start a light, fun, and realistic conversation based on a real-life scene — for example, ordering coffee, chatting with a stranger on a train, asking for directions, etc.

✨ Instructions:
- Start the conversation in ${targetLang}, keeping the user’s level in mind.
- Keep messages short, like texting.
- Let the user respond, and gently correct them *only if needed*, offering a simple explanation or example.
- Add personality! Use emojis, informal tones, and engaging hooks.

🎯 Goal:
Make it feel like a natural chat with a native speaker — not like a robot. Avoid overly formal phrases or textbook language unless necessary.
  `.trim();
};

export const createPrompt = (
  systemPrompt: string,
  history: { from: "user" | "bot"; text: string }[],
  userMessage: string
) => {
  const messages: BaseMessage[] = [new SystemMessage(systemPrompt)];

  for (const msg of history) {
    if (msg.from === "user") {
      messages.push(new HumanMessage(msg.text));
    } else {
      messages.push(new AIMessage(msg.text));
    }
  }

  messages.push(new HumanMessage(userMessage));

  return messages;
};
