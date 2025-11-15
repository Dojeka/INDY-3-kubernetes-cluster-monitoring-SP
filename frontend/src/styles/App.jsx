import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import HistoryPanel from "./components/HistoryPanel";

export default function App() {
    const [history, setHistory] = useState([
    { title: "Create welcome form", subtitle: "Write code (HTML, CSS, JS)" },
    { title: "Instructions", subtitle: "How to set up Wi-Fi" },
    { title: "Career", subtitle: "How to organize your day" },
  ]);

  const clearHistory = () => {
    setHistory([]); // wipe everything
  };
  return (
    <div className="h-screen grid grid-cols-[260px_1fr_300px]">
      <Sidebar />
      <MainPanel />
      <HistoryPanel />
    </div>
  );
}