"use client";

import { useParams } from "next/navigation";
import FolderBreadcrumb from "@/components/custom/FolderBreadcrumb";
import { FileItem } from "@/components/custom/FileItem";
import { FolderItem } from "@/components/custom/FolderItem";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useFolderContext } from "@/hooks/FolderContext";
import { useEffect, useState } from "react";
import { FolderRow } from "@/components/custom/FolderRow";
import { FileRow } from "@/components/custom/FileRow";
import { useViewMode } from "@/context/ViewModeContext";
import Loader from "@/components/custom/Loader";
import { isAudioFile, isImageFile, isPdfFile, isVideoFile } from "@/lib/functions";
import Image from "next/image";
import { FolderDown } from "lucide-react";

export default function FolderPage() {
  const { id } = useParams();
  const folderId = typeof id === "string" ? id : "root";
  const { viewMode, toggleView } = useViewMode();
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const { folders, files, breadcrumbs, setFolderId, loading } =
    useFolderContext();

  useEffect(() => {
    setFolderId(folderId);
  }, [folderId, setFolderId]);

  if (loading) return <Loader />;

  return (
    <ProtectedRoute>
      <FolderBreadcrumb breadcrumbs={breadcrumbs} />
      <button
        onClick={toggleView}
        className="text-sm text-gray-600 hover:text-black px-3 py-1 border rounded shadow-sm bg-white mb-2 flex justify-self-end"
      >
        {viewMode === "gallery" ? "📋 Table View" : "🖼️ Gallery View"}
      </button>
      {viewMode === "gallery" ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {folders.map((folder) => (
            <FolderItem key={folder._id} name={folder.name} id={folder._id} />
          ))}
          {files.map((file) => (
            <FileItem
              key={file._id}
              name={file.name}
              type={file.type}
              url={file.url}
              id={file._id}
              onPreview={(signedUrl) =>
                setSelectedFile({ url: signedUrl, name: file.name })
              }
            />
          ))}
        </div>
      ) : (
        // FolderPage.tsx
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {folders.map((folder) => (
                <FolderRow
                  key={folder._id}
                  name={folder.name}
                  id={folder._id}
                />
              ))}
              {files.map((file) => (
                <FileRow
                  key={file._id}
                  name={file.name}
                  type={file.type}
                  id={file._id}
                  onPreview={(signedUrl) =>
                    setSelectedFile({ url: signedUrl, name: file.name })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {folders.length === 0 && files.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-500">
          <FolderDown className="w-16 h-16 mb-4" />
          <h2 className="text-lg font-semibold">This folder is empty</h2>
          <p className="text-sm mt-1">Upload files or create a new folder to get started.</p>
        </div>
      )}

      {selectedFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="relative w-[80%] h-[80%] p-4 rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isImageFile(selectedFile.name) ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : isVideoFile(selectedFile.name) ? (
              <video controls className="w-full h-full">
                <source src={selectedFile.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : isAudioFile(selectedFile.name) ? (
              <audio controls className="w-full">
                <source src={selectedFile.url} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            ) : isPdfFile(selectedFile.name) ? (
              <iframe
                src={selectedFile.url}
                title={selectedFile.name}
                className="w-full h-full"
              ></iframe>
            ) : (
              <p className="text-white text-center">Unsupported file type</p>
            )}

            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
