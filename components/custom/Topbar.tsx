'use client'

// components/custom/Topbar.tsx
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth)
    router.push('/login');
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
      <h1 className="text-xl font-semibold">Sora Drive</h1>
      <div className="flex items-center gap-4">
        {/* You can add search here */}
        <Button onClick={handleLogout} disabled={loading}>{loading ? 'Logging out...' : 'Logout'}</Button>
      </div>
    </header>
  );
}
