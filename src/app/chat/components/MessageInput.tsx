interface MessageInputProps {
    message: string;
    setMessage: (value: string) => void;
    onSend: () => void;
  }
  
  export default function MessageInput({ message, setMessage, onSend }: MessageInputProps) {
    return (
      <div className="flex gap-2 p-4 bg-white border-t">
        <input
          className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onSend}
        >
          Send
        </button>
      </div>
    );
  }