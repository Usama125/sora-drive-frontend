// hooks/FolderContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '@/lib/axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface FolderItem {
  _id: string;
  name: string;
  type: 'folder' | 'file';
  url?: string;
}

interface Breadcrumb {
  name: string;
  id: string;
}

interface FolderContextValue {
  folders: FolderItem[];
  files: FolderItem[];
  breadcrumbs: Breadcrumb[];
  loading: boolean;
  refresh: () => void;
  setFolderId: (id: string) => void;
}

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolderContext() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolderContext must be used inside <FolderProvider>");
  return ctx;
}

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FolderItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [folderId, setFolderId] = useState<string>("root");
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const fetchContents = useCallback(async () => {
    if (!folderId || !authReady) return;

    setLoading(true);
    try {
      const res = await axios.get(folderId === "root" ? `/files/list` : `/files/list/${folderId}`);
      setFolders(res.data.folders || []);
      setFiles(res.data.files || []);
      setBreadcrumbs(res.data.breadcrumbs || []);
    } catch (err) {
      console.error("Failed to fetch folder contents:", err);
    } finally {
      setLoading(false);
    }
  }, [folderId, authReady]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return (
    <FolderContext.Provider value={{ folders, files, breadcrumbs, loading, refresh: fetchContents, setFolderId }}>
      {children}
    </FolderContext.Provider>
  );
}
