'use client';

import CreateFolderModal from "@/components/custom/CreateFolderModal";
import Sidebar from "@/components/custom/Sidebar";
import Topbar from "@/components/custom/Topbar";
import UploadModal from "@/components/custom/UploadModal";
import { FolderProvider } from "@/hooks/FolderContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const params = useParams();

  const rawId = params?.id;
  const currentFolderId = Array.isArray(rawId) ? rawId[0] : rawId || "root";

  const handleUpload = () => setUploadOpen(true);
  const handleNewFolder = () => setFolderOpen(true);

  return (
    <FolderProvider>
    <div className="flex h-screen w-full">
      <Sidebar onNewFolder={handleNewFolder} onUploadFile={handleUpload} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        parent={currentFolderId}
        onUploaded={() => setUploadOpen(false)}
      />

      <CreateFolderModal
        open={folderOpen}
        onClose={() => setFolderOpen(false)}
        parent={currentFolderId}
        onCreated={() => setFolderOpen(false)}
      />
    </div>
    </FolderProvider>
  );
}
