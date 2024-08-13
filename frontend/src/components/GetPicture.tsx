import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const GetPicture = () => {
  const { setSelectedFile, setIsEdit, updatePhotoProfile } = useAuth();
  const [photoSave, setPhotoSave] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    useEffect(() => {
      if (file) {
        setPhotoSave(true)
        setSelectedFile(file);
      }
      console.log(file);
    }, [file])
  };

  return (
    <div className="flex mt-1 items-center space-x-2">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onChange={() => { setPhotoSave(true); console.log(photoSave) }}>
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        onClick={() => setIsEdit(false)}
      >
        Discard
      </button>
      <button
        onClick={updatePhotoProfile}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Change
      </button>
    </div>
  );
};

export default GetPicture;


