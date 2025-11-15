import SidebarNav from "./SidebarNav";
import SidebarProCard from "./SidebarProCard";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-[#0f0f11] text-white border-r border-gray-800 flex flex-col">
      <SidebarNav />
      <SidebarProCard />
    </aside>
  );
}
