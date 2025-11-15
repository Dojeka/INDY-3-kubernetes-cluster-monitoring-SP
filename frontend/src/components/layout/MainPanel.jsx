import ChatResponseCard from "./ChatResponseCard";
import RegenerateButton from "./RegenerateButton";
import ChatInput from "./ChatInput";

export default function MainPanel() {
  return (
    <div className="flex flex-col h-full bg-[#141417] text-gray-200">
      <div className="p-4">
        <ChatResponseCard />
        <RegenerateButton />
      </div>

      <ChatInput />
    </div>
  );
}
