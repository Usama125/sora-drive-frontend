'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useFolderContext } from "@/hooks/FolderContext";

interface Props {
  open: boolean;
  onClose: () => void;
  parent?: string | null;
  onCreated?: () => void;
}

export default function CreateFolderModal({ open, onClose, parent, onCreated }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { refresh } = useFolderContext();

  const handleCreate = async () => {
    if (!name) return;
    setLoading(true);

    try {
      await axios.post("/files/create-folder", { name, parent });
      onCreated?.();
      onClose();
      setName("");
      refresh();
    } catch (err) {
      console.error("Create folder error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="mt-4" disabled={!name || loading} onClick={handleCreate}>
          {loading ? "Creating..." : "Create Folder"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
