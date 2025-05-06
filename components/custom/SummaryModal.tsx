import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SummaryModalProps {
  type: "required" | "additional" | "features" | null;
  onClose: () => void;
}

const contentMap = {
  required: {
    title: "✅ Required Features",
    items: [
      "File upload with progress bar",
      "File/folder listing and navigation",
      "File storage in cloud (S3 or equivalent)",
      "User authentication (Firebase)",
    ],
  },
  additional: {
    title: "✨ Additional Features Implemented",
    items: [
      "Support for image, video, audio, and PDF files",
      "Signed URL upload + view via AWS S3",
      "Modern drag-and-drop upload modal with cancel option",
      "Dynamic file preview (image viewer, video/audio player, PDF tab)",
      "Gallery and table views toggle",
      "Folder breadcrumb navigation",
      "Clean, responsive UI using ShadCN + Tailwind CSS",
    ],
  },
  features: {
    title: "🚀 Features Sora Drive Supports",
    items: [
      "Secure file uploads to AWS S3 using signed URLs",
      "Cancel in-progress uploads gracefully",
      "Folder-based file organization",
      "Dynamic preview support (image, PDF, video, audio)",
      "Firebase Auth for secure login/logout",
      "File metadata saved in MongoDB (only filename, folder ref)",
      "File deletion with confirmation",
      "Real-time UI updates on file operations",
      "Beautiful minimal design with responsive layout",
    ],
  },
};

export default function SummaryModal({ type, onClose }: SummaryModalProps) {
  if (!type) return null;

  const { title, items } = contentMap[type];

  return (
    <Dialog open={!!type} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
