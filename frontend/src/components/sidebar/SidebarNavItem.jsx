export default function SidebarNavItem({ label, icon: Icon, pro }) {
  return (
    <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition">
      <Icon size={18} />
      <span>{label}</span>

      {pro && (
        <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">
          PRO
        </span>
      )}
    </button>
  );
}
