"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import PreferencesPopup from "./components/PreferencesPopup";
import ChatMessages from "./components/ChatMessages";
import MessageInput from "./components/MessageInput";

interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

interface Preferences {
  knownLang: string;
  targetLang: string;
  level: "beginner" | "intermediate" | "advanced";
}

export default function ChatPage() {
  const [knownLang, setKnownLang] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [sessionId] = useState<string>(() => Date.now().toString());
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false); // New state for typing indicator

  const userId = "user-123";

  const savePreferences = ({ knownLang, targetLang, level }: Preferences) => {
    setKnownLang(knownLang);
    setTargetLang(targetLang);
    setLevel(level);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setChat([...chat, { from: "user", text: userMsg }]);
    setMessage("");
    setIsTyping(true); // Show typing indicator

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          knownLang,
          targetLang,
          level,
          message: userMsg,
          sessionId,
          userId,
        }),
      });

      const data: { reply: string } = await res.json();
      setChat((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChat((prev) => [...prev, { from: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  const setupComplete = knownLang && targetLang;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl flex flex-col h-[90vh] md:h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            Language Chatbot
          </h1>
          {setupComplete && (
            <button
              onClick={() => setShowSettings(true)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Chat Area */}
        {setupComplete ? (
          <>
            <ChatMessages chat={chat} isTyping={isTyping} />
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Please set up your preferences to start chatting!
          </div>
        )}

        {/* Preferences Popup */}
        <PreferencesPopup
          isOpen={showPopup || showSettings}
          onClose={() => {
            setShowPopup(false);
            setShowSettings(false);
          }}
          onSave={savePreferences}
        />
      </div>
    </div>
  );
}