import { Send, Upload } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="border-t border-gray-800 p-4 flex items-center gap-2">
      <button classn="p-2 rounded bg-gray-800 hover:bg-gray-700">
        <Upload size={18} />
      </button>

      <input
        type="text"
        placeholder="Start typing"
        className="flex-1 bg-[#1a1a1d] p-3 rounded-lg outline-none"
      />

      <button className="p-2 rounded bg-blue-600 hover:bg-blue-500">
        <Send size={18} />
      </button>
    </div>
  );
}
