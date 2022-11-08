import { useEffect, useState } from 'react';

import Icon, { IconSize } from '@/components/utils/Icon';

function FileID(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

async function readFileAsDataURL(file: File) {
  const result_base64 = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

  return result_base64 as string;
}

export function ImageUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (s: File[]) => void;
}) {
  type PreviewImage = {
    url: string;
    id: string;
  };

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    async function readFiles(files: File[]) {
      const urls: PreviewImage[] = [];
      for await (const file of files) {
        const url = await readFileAsDataURL(file);
        urls.push({ id: FileID(file), url });
      }
      setPreviewImages(urls);
    }

    readFiles(files);
  }, [files]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="flex cursor-pointer items-center gap-2 hover:text-main-light">
          <input
            type="file"
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              if (!e.target.files) return;

              const file = e.target?.files[0];
              setFiles([...files, file]);
            }}
          />
          <Icon icon="image" />
          <span className="label">Upload an image</span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {previewImages &&
          previewImages.length > 0 &&
          previewImages.map((image, imgIndex) => {
            return (
              <div
                className="flex max-w-md shrink-0 grow flex-col items-center space-y-2 laptop:max-w-lg"
                key={image.id + imgIndex}
              >
                <img
                  src={image.url}
                  alt="file"
                  className="aspect-video w-full shrink-0  grow-0 snap-center object-cover"
                />
                <button
                  className="flex items-center space-x-2 hover:text-main-light"
                  onClick={() => {
                    const newFiles = [
                      ...files.slice(0, imgIndex),
                      ...files.slice(imgIndex + 1),
                    ];
                    setFiles(newFiles);
                  }}
                >
                  <Icon icon="delete" size={IconSize.Small} />
                  <span className="body-sm">Delete image</span>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
