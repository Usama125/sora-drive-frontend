// components/custom/FolderRow.tsx
"use client";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useFolderContext } from "@/hooks/FolderContext";
import axios from "@/lib/axios";

export function FolderRow({ name, id }: { name: string; id: string }) {
  const router = useRouter();

  const { refresh } = useFolderContext();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete folder ${name}?`)) {
      await axios.delete(`/files/${id}`);
      refresh();
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 cursor-pointer" onClick={() => router.push(`/folder/${id}`)}>
        📁 {name}
      </td>
      <td className="p-3 text-gray-600">Folder</td>
      <td className="p-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            {/* Add more actions if needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
