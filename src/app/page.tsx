"use client";

// pages/index.tsx or any page/component rendering Settings
import Landing from "./Landing/page";
import Settings from "@/Modals/Settings";
import { useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => setIsSettingsOpen(true)}>Open Settings</button>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Landing />
    </main>
  );
}
