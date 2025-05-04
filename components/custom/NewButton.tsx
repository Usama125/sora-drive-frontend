"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Upload, FolderPlus } from "lucide-react";

export default function NewButton({
  onNewFolder,
  onUploadFile,
}: {
  onNewFolder: () => void;
  onUploadFile: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="w-full">+ New</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={onNewFolder}>
          <FolderPlus className="mr-2 h-4 w-4" /> New Folder
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUploadFile}>
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
