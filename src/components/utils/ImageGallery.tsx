import { useEffect, useState } from 'react';

async function readFileAsDataURL(file: File) {
  const result_base64 = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

  return result_base64 as string;
}

export function ImageGallery({ files }: { files: File[] }) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    async function readFiles(files: File[]) {
      const urls: string[] = [];
      for await (const file of files) {
        const url = await readFileAsDataURL(file);
        urls.push(url);
      }
      setPreviewImages(urls);
    }

    readFiles(files);
  }, [files]);

  return (
    <div className="grid grid-cols-3 gap-8">
      {previewImages &&
        previewImages.length > 0 &&
        previewImages.map((image, imageIndex) => {
          return (
            <div
              className="shrink-0 grow flex flex-col items-center space-y-2 max-w-md laptop:max-w-lg"
              key={imageIndex}
            >
              <img
                src={image}
                alt="file"
                className="shrink-0 grow-0 aspect-video  snap-center object-cover w-full"
              />
            </div>
          );
        })}
    </div>
  );
}
