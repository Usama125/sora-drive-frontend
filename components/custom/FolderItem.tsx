// components/custom/FolderItem.tsx
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useFolderContext } from "@/hooks/FolderContext";
import axios from "@/lib/axios";

export const FolderItem = ({ name, id }: { name: string; id: string }) => {
  const router = useRouter();

  const { refresh } = useFolderContext();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await axios.delete(`/files/${id}`);
      refresh(); // Refetch contents
    }
  };
  
  return (
    <div
      onClick={() => router.push(`/folder/${id}`)}
      className="relative w-44 h-48 bg-white rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer flex flex-col justify-center items-center"
    >
      <div className="text-5xl">📁</div>
      <div className="text-sm font-medium mt-2 px-2 text-center truncate w-32" title={name}>
        {name}
      </div>
      <div className="absolute top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4 text-gray-600 hover:text-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          {/* Add more actions here */}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};
