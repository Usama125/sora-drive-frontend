// components/custom/FolderBreadcrumb.tsx
import { ChevronRight, ChevronDown } from "lucide-react";

export default function FolderBreadcrumb() {
  // Hardcoded path for now — will be dynamic in future
  const folders = ["My Drive", "Test"];

  return (
    <div className="flex items-center text-sm font-medium text-gray-700 mb-4">
      {folders.map((folder, index) => (
        <div key={index} className="flex items-center">
          <span>{folder}</span>
          {index < folders.length - 1 ? (
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </div>
      ))}
    </div>
  );
}
