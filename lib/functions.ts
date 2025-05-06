export const isImageFile = (name: string) => /\.(jpe?g|png|gif|webp|svg|bmp)$/i.test(name);
export const isPdfFile = (name: string) => /\.pdf$/i.test(name);
export const isVideoFile = (name: string) => /\.(mp4|webm|ogg|mov|mkv)$/i.test(name);
export const isAudioFile = (name: string) => /\.(mp3|wav|aac|ogg|m4a)$/i.test(name);

export const getReadableFileType = (name: string): string => {
  if (isImageFile(name)) return "Image File";
  if (isVideoFile(name)) return "Video File";
  if (isAudioFile(name)) return "Audio File";
  if (isPdfFile(name)) return "PDF File";
  return "Unknown File";
};
