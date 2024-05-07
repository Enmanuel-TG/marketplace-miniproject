import { useAuth } from '../contexts/authContexts';

const GetPicture = () => {
  const { setSelectedFile, setIsEdit  } = useAuth();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setIsEdit(true);
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default GetPicture;



