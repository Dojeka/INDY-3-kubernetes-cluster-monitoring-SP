import HistoryItem from "./HistoryItem";

export default function HistoryPanel({ history, clearHistory }) {
  return (
    <aside className="w-80 h-full border-l border-gray-800 bg-[#0f0f11] text-gray-200 flex flex-col">
      <div className="px-5 py-6 text-xl font-semibold">History</div>

      <div className="flex-1 overflow-y-auto">
        {history.map((item, i) => (
          <HistoryItem key={i} {...item} />
        ))}

        {history.length === 0 && (
          <div className="p-4 text-gray-500 text-sm">No history yet.</div>
        )}
      </div>

      <button
        onClick={clearHistory}
        className="m-4 px-3 py-2 bg-gray-800 text-sm rounded-lg hover:bg-gray-700"
      >
        Clear history
      </button>
    </aside>
  );
}
