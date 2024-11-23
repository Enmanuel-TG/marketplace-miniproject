import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { downloadImg } from '../utilities/download-img.utility';

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  imgs?: string[];
}

const ImageUploader = ({ onFilesChange, imgs }: ImageUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles = [...selectedFiles, ...acceptedFiles];
    setSelectedFiles(updatedFiles);
    onFilesChange([...updatedFiles, ...previewImage]);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveNewFile = (index: number) => {
    const newImgs = previewImage.filter((_, i) => i !== index);
    setPreviewImage(newImgs);
    onFilesChange([...selectedFiles, ...newImgs]);
  };

  const getImgs = async () => {
    const res = await downloadImg(imgs as unknown as string[]);
    setPreviewImage(res as File[]);
    onFilesChange(res as File[]);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (imgs) {
      getImgs();
    }
  }, [imgs]);

  return (
    <div className="py-10 px-4 mb-2 border-dashed border-2 border-gray-300 rounded-md">
      <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }} multiple>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className="cursor-pointer">Drag & drop images here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      <div className="mt-4 flex flex-wrap gap-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="aspect-square size-24 object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-md m-auto p-1"
              onClick={() => handleRemoveFile(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {previewImage.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="aspect-square size-24 object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-md m-auto p-1"
              onClick={() => handleRemoveNewFile(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
