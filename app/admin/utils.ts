const MAX_WIDTH = 1600;
const QUALITY = 0.85;

export async function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader 실패"));
    reader.readAsDataURL(file);
  });
}

export async function resizeToWebP(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const ratio = bitmap.height / bitmap.width;
  const targetWidth = Math.min(bitmap.width, MAX_WIDTH);
  const targetHeight = Math.round(targetWidth * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context를 얻지 못했습니다");

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("webp 변환 실패"));
      },
      "image/webp",
      QUALITY
    );
  });
}
