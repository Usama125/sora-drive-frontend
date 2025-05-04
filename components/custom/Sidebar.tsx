'use client'

import NewButton from "@/components/custom/NewButton";

export default function Sidebar() {
  const handleNewFolder = () => {
    console.log("Create folder modal here");
  };

  const handleUploadFile = () => {
    console.log("Trigger file upload here");
  };

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Sora Drive</h2>

      <NewButton onNewFolder={handleNewFolder} onUploadFile={handleUploadFile} />

      <nav className="mt-6 space-y-2 text-sm text-gray-700">
        <p className="hover:text-blue-600 cursor-pointer">My Drive</p>
        <p className="hover:text-blue-600 cursor-pointer">Shared with me</p>
        <p className="hover:text-blue-600 cursor-pointer">Trash</p>
      </nav>
    </aside>
  );
}
