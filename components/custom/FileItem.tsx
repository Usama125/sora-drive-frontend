// components/custom/FileItem.tsx
import { useFolderContext } from "@/hooks/FolderContext";
import { MoreVertical } from "lucide-react";
import axios from "@/lib/axios";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getReadableFileType, isAudioFile, isImageFile, isPdfFile, isVideoFile } from "@/lib/functions";
import { FileText, FileAudio, FileVideo, File } from "lucide-react";

export const FileItem = ({
  id,
  name,
  onPreview,
}: {
  id: string;
  name: string;
  type: string;
  url?: string;
  onPreview?: (signedUrl: string) => void;
}) => {
  const [signedUrl, setSignedUrl] = useState("");
  const { refresh } = useFolderContext();

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await axios.get(`/files/s3/view`, { params: { fileName: name } });
      setSignedUrl(res.data.url);
    };
    fetchUrl();
  }, [name]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await axios.delete(`/files/${id}`);
      refresh(); // Refetch contents
    }
  };

  return (
    <div
      onClick={() => onPreview?.(signedUrl)}
      className="relative w-44 h-48 bg-white rounded-lg shadow-sm border hover:shadow-md transition flex flex-col items-center justify-between py-4 cursor-pointer"
    >
      <div className="flex-grow flex items-center justify-center">
        {isImageFile(name) && signedUrl ? (
          <img src={signedUrl} alt={name} className="w-20 h-20 object-cover rounded" />
        ) : isPdfFile(name) ? (
          <FileText className="w-16 h-16 text-red-600" />
        ) : isVideoFile(name) ? (
          <FileVideo className="w-16 h-16 text-blue-600" />
        ) : isAudioFile(name) ? (
          <FileAudio className="w-16 h-16 text-green-600" />
        ) : (
          <File className="w-16 h-16 text-gray-500" />
        )}
      </div>
  
      <div className="px-3 text-sm w-full text-center truncate" title={name}>
        {name}
      </div>
  
      <div className="flex justify-between items-center w-full px-3 pb-2 text-xs text-gray-400">
        <span>{getReadableFileType(name)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-4 h-4 cursor-pointer text-gray-500 hover:text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );  
};
