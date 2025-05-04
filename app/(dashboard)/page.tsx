// app/(dashboard)/page.tsx
import { FileItem } from "@/components/custom/FileItem";
import FolderBreadcrumb from "@/components/custom/FolderBreadcrumb";

export default function DashboardPage() {
  const mockFiles = [
    { name: "Resume.pdf", type: "pdf" },
    { name: "Screenshot.png", type: "image" },
  ];

  return (
    <>
      <FolderBreadcrumb />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {mockFiles.map((file, index) => (
          <FileItem key={index} name={file.name} type={file.type} />
        ))}
      </div>
    </>
  );
}
