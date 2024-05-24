import { useAuth } from '../contexts/AuthContext';
const GetPicture = () => {
  const { setSelectedFile, setIsEdit } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsEdit(false);
      setSelectedFile(file);
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={() => setIsEdit(false)}>back</button>
    </div>
  );
};

export default GetPicture;

