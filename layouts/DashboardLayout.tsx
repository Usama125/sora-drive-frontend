'use client';

import CreateFolderModal from "@/components/custom/CreateFolderModal";
import Sidebar from "@/components/custom/Sidebar";
import Topbar from "@/components/custom/Topbar";
import UploadModal from "@/components/custom/UploadModal";
import { FolderProvider } from "@/hooks/FolderContext";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, FolderPlus } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;
  const currentFolderId = Array.isArray(rawId) ? rawId[0] : rawId || "root";

  const handleUpload = () => setUploadOpen(true);
  const handleNewFolder = () => setFolderOpen(true);

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth)
    router.push('/login');
  }

  return (
    <FolderProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar - visible only on md and above */}
        <div className="hidden md:block w-[260px] border-r">
          <Sidebar onNewFolder={handleNewFolder} onUploadFile={handleUpload} />
        </div>

        <div className="flex flex-col flex-1">
          {/* Top Header - shows full on mobile */}
          <div className="md:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm">
            <h1 className="font-bold text-lg">Sora Drive</h1>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="text-sm px-3 py-1">+ New</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={handleNewFolder}>
                    <FolderPlus className="mr-2 h-4 w-4" /> New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="text-sm px-3 py-1" onClick={handleLogout} disabled={loading}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>

          {/* Topbar (hidden on mobile) */}
          <div className="hidden md:block">
            <Topbar />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {children}
          </main>
        </div>

        {/* Modals */}
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
