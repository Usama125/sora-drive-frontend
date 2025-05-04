// components/custom/Topbar.tsx
import { Avatar } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
      <h1 className="text-xl font-semibold">My Drive</h1>
      <div className="flex items-center gap-4">
        {/* You can add search here */}
        <Avatar className="h-8 w-8" />
      </div>
    </header>
  );
}
