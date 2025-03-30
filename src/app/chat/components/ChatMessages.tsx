interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

interface ChatMessagesProps {
  chat: ChatMessage[];
  isTyping: boolean;
}

export default function ChatMessages({ chat, isTyping }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner">
      {chat.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[80%] p-3 rounded-xl ${
            msg.from === "user"
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-gray-200 text-gray-800"
          }`}
        >
          <p className="whitespace-pre-wrap">{msg.text}</p>
        </div>
      ))}
      {isTyping && (
        <div className="max-w-[80%] p-3 rounded-xl mr-auto bg-gray-200 text-gray-800 flex items-center">
          <span className="animate-pulse">...</span>
        </div>
      )}
    </div>
  );
}