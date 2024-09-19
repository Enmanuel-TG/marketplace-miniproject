import { toastifyConfig } from '@/utilities/toastify.utility';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { DialogClose } from '@/components/ui/dialog';
const GetPicture = ({ onPhotoChange }: { onPhotoChange: (newPhoto: string) => void }) => {
  const { updatePhotoProfile } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempFile = e.target.files?.[0] || null;
    if (!tempFile) return;
    setFile(tempFile);
    onPhotoChange(URL.createObjectURL(tempFile));
  };

  const updatePhoto = () => {
    if (!file) {
      toast.error('Please select a file', toastifyConfig);
      return;
    }

    updatePhotoProfile(file);
  };

  return (
    <div className="flex mt-1 items-center space-x-2">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Choose File
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <DialogClose onClick={updatePhoto} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Change
      </DialogClose>
    </div>
  );
};

export default GetPicture;
