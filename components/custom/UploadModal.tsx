'use client';

import { useRef, useState } from "react";
import axios from "@/lib/axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFolderContext } from "@/hooks/FolderContext";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  parent?: string | null;
  onUploaded?: () => void;
}

export default function UploadModal({ open, onClose, parent, onUploaded }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { refresh } = useFolderContext();
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      alert("File must be under 50MB.");
      return;
    }
  
    try {
      setUploading(true);
      setProgress(0);
  
      // 1. Get signed URL
      const { data } = await axios.get("/files/s3/sign", {
        params: { fileName: file.name, fileType: file.type },
      });
  
      // 2. Upload using XMLHttpRequest to track progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr; // 🔑 Save ref to cancel later
      
        xhr.open("PUT", data.url, true);
        xhr.setRequestHeader("Content-Type", file.type);
      
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          }
        };
      
        xhr.onload = () => {
          xhrRef.current = null;
          if (xhr.status === 200) resolve();
          else reject(new Error("Upload failed"));
        };
      
        xhr.onerror = () => {
          xhrRef.current = null;
          reject(new Error("Upload error"));
        };
      
        xhr.send(file);
      });
  
      // 3. Save metadata to DB
      await axios.post("/files/upload", {
        name: file.name,
        parent: parent === "root" ? null : parent,
      });
  
      onUploaded?.();
      onClose();
      refresh();
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      setFile(null);
    }
  };  

  const handleCancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
      setUploading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a File</DialogTitle>
        </DialogHeader>

        <Input key={uploading ? 1 : 0} type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        {uploading && (
          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div
              className="h-2 bg-blue-600 rounded transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="text-xs text-gray-600 mt-1">
              {progress}% uploaded
              <span
                onClick={handleCancelUpload}
                className="text-red-600 hover:text-red-800 ml-2 text-sm"
              >
                ✕ Cancel
              </span>
            </div>
          </div>
        )}

        <Button disabled={!file || uploading} onClick={handleUpload} className="mt-4">
          {uploading ? `Uploading...` : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
