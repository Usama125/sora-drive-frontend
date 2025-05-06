"use client";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function FolderBreadcrumb({ breadcrumbs }: { breadcrumbs: { name: string; id: string }[] }) {
  const router = useRouter();

  return (
    <div className="flex items-center text-sm font-medium text-gray-700 mb-4">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.id} className="flex items-center">
          <span
            onClick={() => router.push(`/folder/${crumb.id}`)}
            className="cursor-pointer hover:underline"
          >
            {crumb.name}
          </span>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}
