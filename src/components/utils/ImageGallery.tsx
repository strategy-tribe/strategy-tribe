import React, { useEffect, useState } from 'react';

export function ImageGallery({ files }: { files: File[] }) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        const newImage = reader.result as string;
        setPreviewImages([...previewImages, newImage]);
      }
    };

    files.forEach((f) => {
      reader.readAsDataURL(f);
    });
  }, [files]);

  return (
    <div className="flex items-start pr-2 space-x-4 snap-x overflow-x-auto ">
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
