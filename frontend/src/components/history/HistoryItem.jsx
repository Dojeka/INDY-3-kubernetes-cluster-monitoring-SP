export default function HistoryItem({ title, subtitle }) {
  return (
    <div className="px-4 py-3 border-b border-gray-800 hover:bg-gray-800/50 transition cursor-pointer">
      <div className="font-medium">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
  );
}
