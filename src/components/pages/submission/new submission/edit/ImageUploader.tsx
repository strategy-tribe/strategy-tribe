import Icon from '@/components/utils/Icon';
import React, { useState } from 'react';

function FileID(file: File) {
  return `${file.name}-${file.size}`;
}

export function ImageUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (s: File[]) => void;
}) {
  const [previewImages, setPreviewImages] = useState<
    { url: string; id: string }[]
  >([]);

  return (
    <>
      <div className="flex space-x-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer hover:text-main-light">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (!e.target.files) return;
              const reader = new FileReader();

              const file = e.target?.files[0];
              reader.readAsDataURL(file);
              setFiles([...files, file]);

              reader.onload = () => {
                if (reader.readyState === 2) {
                  const newImage = reader.result as string;
                  setPreviewImages([
                    ...previewImages,
                    { url: newImage, id: FileID(file) },
                  ]);
                }
              };
            }}
          />
          <Icon icon="image" />
          <span className="label">Upload an image</span>
        </label>
      </div>

      <div className="grid grid-cols-3">
        {previewImages &&
          previewImages.length > 0 &&
          previewImages.map((image) => {
            return (
              <div
                className="shrink-0 grow flex flex-col items-center space-y-2 max-w-md laptop:max-w-lg"
                key={image.id}
              >
                <img
                  src={image.url}
                  alt="file"
                  className="shrink-0 grow-0 aspect-video  snap-center object-cover w-full"
                />
                <button
                  className="flex space-x-2 items-center hover:text-main-light"
                  onClick={() => {
                    setPreviewImages(
                      previewImages.filter((img) => img !== image)
                    );
                    const newFiles = files.filter((file) => {
                      return image.id !== FileID(file);
                    });
                    setFiles(newFiles);
                  }}
                >
                  <Icon icon="delete" />
                  <span>Delete image</span>
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
