import Icon from '@/components/utils/Icon';
import React, { useState } from 'react';

export function ImageUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (s: File[]) => void;
}) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  return (
    <>
      <div className="flex space-x-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer hover:text-purpleLight">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (!e.target.files) return;
              const reader = new FileReader();

              reader.onload = () => {
                if (reader.readyState === 2) {
                  const newImage = reader.result as string;
                  setPreviewImages([...previewImages, newImage]);
                }
              };

              const file = e.target?.files[0];
              reader.readAsDataURL(file);
              setFiles([...files, file]);
            }}
          />
          <Icon icon="image" />
          <span className="label">Upload an image</span>
        </label>
      </div>

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
                <button
                  className="flex space-x-2 items-center hover:text-purpleLight"
                  onClick={() => {
                    setPreviewImages(
                      previewImages.filter((img) => img !== image)
                    );
                    const newFiles = files.filter((file, fileIndex) => {
                      return imageIndex !== fileIndex;
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
