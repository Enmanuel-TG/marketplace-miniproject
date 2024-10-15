import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  initialFiles?: string[];
}

const ImageUploader = ({ onFilesChange, initialFiles = [] }: ImageUploaderProps) => {
  console.log('Hi');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles = [...selectedFiles, ...acceptedFiles];
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="py-10 px-4 mb-2 border-dashed border-2 border-gray-300 rounded-md">
      <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }} multiple>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className='cursor-pointer'>Drag & drop images here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      <div className="mt-4 flex flex-wrap gap-4">
        {selectedFiles.map((file, idx) => (
          <div key={idx} className="relative">
            <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="h-24 w-24 object-cover rounded" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-md m-auto p-1"
              onClick={() => handleRemoveFile(idx)}
            >
              x
            </button>
          </div>
        ))}
        {initialFiles.length > 0 &&
          initialFiles.map((fileUrl, idx) => (
            <div key={idx} className="relative">
              <img src={fileUrl} alt={`preview-${idx}`} className="object-cover rounded" />
              <button
                type="button"
                className="absolute  bg-red-500 text-white rounded-md"
                onClick={() => handleRemoveFile(idx)}
              ></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
