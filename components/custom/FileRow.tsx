// components/custom/FileRow.tsx
"use client";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useFolderContext } from "@/hooks/FolderContext";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { getReadableFileType, isAudioFile, isImageFile, isPdfFile, isVideoFile } from "@/lib/functions";
import { FileText, FileAudio, FileVideo, File } from "lucide-react";
import Image from "next/image";

export function FileRow({ name, id, onPreview }: { name: string; type: string; id: string; onPreview?: (signedUrl: string) => void;}) {
  const [signedUrl, setSignedUrl] = useState("");

  const { refresh } = useFolderContext();

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await axios.get(`/files/s3/view`, { params: { fileName: name } });
      setSignedUrl(res.data.url);
    };
    fetchUrl();
  }, [name]);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await axios.delete(`/files/${id}`);
      refresh(); // Refetch contents
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 flex items-center gap-3 cursor-pointer" onClick={() => onPreview?.(signedUrl)}>
        {isImageFile(name) && signedUrl ? (
          <Image src={signedUrl} unoptimized alt={name} width={20} height={20} className="w-5 h-5 object-cover rounded" />
        ) : isPdfFile(name) ? (
          <FileText className="w-5 h-5 text-red-600" />
        ) : isVideoFile(name) ? (
          <FileVideo className="w-5 h-5 text-blue-600" />
        ) : isAudioFile(name) ? (
          <FileAudio className="w-5 h-5 text-green-600" />
        ) : (
          <File className="w-5 h-5 text-gray-500" />
        )}
        <span>{name}</span>
      </td>
      <td className="p-3 text-gray-600">{getReadableFileType(name)}</td>
      <td className="p-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
