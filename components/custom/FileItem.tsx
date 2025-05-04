// components/custom/FileItem.tsx
export const FileItem = ({ name, type }: { name: string; type: string }) => {
  return (
    <div className="p-4 border bg-white rounded shadow-sm hover:shadow-md transition">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-500">{type.toUpperCase()} File</div>
    </div>
  );
};
