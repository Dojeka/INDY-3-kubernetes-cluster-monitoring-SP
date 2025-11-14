import { Home, FileText, LayoutGrid, Settings, Star } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";

export default function SidebarNav() {
  const navItems = [
    { label: "AI Chat Helper", icon: Home },
    { label: "Templates", icon: LayoutGrid, pro: true },
    { label: "My Projects", icon: FileText, pro: true },
    { label: "PRO", icon: Star },
    { label: "Statistics", icon: FileText, pro: true },
    { label: "Settings", icon: Settings },
  ];

  return (
    <nav className="flex-1 px-4 space-y-1">
      {navItems.map((item, i) => (
        <SidebarNavItem key={i} {...item} />
      ))}
    </nav>
  );
}
