'use client';

import NewButton from "@/components/custom/NewButton";
import { redirect } from "next/navigation";
import { useState } from "react";
import SummaryModal from "./SummaryModal";

interface SidebarProps {
  onNewFolder: () => void;
  onUploadFile: () => void;
}

export default function Sidebar({ onNewFolder, onUploadFile }: SidebarProps) {
  const [openModal, setOpenModal] = useState<null | "required" | "additional" | "features">(null);

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col h-screen">
      <h2 className="text-lg font-bold mb-6">Sora Drive</h2>

      <NewButton onNewFolder={onNewFolder} onUploadFile={onUploadFile} />

      <nav className="mt-6 space-y-2 text-sm text-gray-700">
        <p className="hover:text-blue-600 cursor-pointer" onClick={() => redirect("/folder/root")}>
          My Drive
        </p>
      </nav>

      <div className="mt-6 text-xs text-gray-800 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold">📌 Assignment Summary</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold">✅ Required Features</span>
          <button onClick={() => setOpenModal("required")} className="text-blue-500 text-xs hover:underline">View</button>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">✨ Additional Features</span>
          <button onClick={() => setOpenModal("additional")} className="text-blue-500 text-xs hover:underline">View</button>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">🚀 Features Sora Drive Supports</span>
          <button onClick={() => setOpenModal("features")} className="text-blue-500 text-xs hover:underline">View</button>
        </div>
      </div>

      <SummaryModal type={openModal} onClose={() => setOpenModal(null)} />
    </aside>
  );
}
