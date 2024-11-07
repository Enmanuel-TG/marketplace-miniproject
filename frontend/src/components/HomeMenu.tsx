import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';

const style: string =
  'bg-white my-2 p-2 placeholder: rounded-full shadow-md hover:bg-gray-400 hover:cursor-pointer no-select no-drag';

export const HomeMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const verifyAuthStatus = (where: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first', toastifyConfig);
      navigate('/login', { replace: true });
      return;
    }
    navigate(`/${where}`);
  };

  return (
    <div>
      {menuOpen && (
        <div className="flex flex-col">
          <img
            title="Create product"
            onClick={() => {
              verifyAuthStatus('create-product');
            }}
            className={style}
            src="/create.svg"
          />
          <img
            title="Profile"
            onClick={() => {
              verifyAuthStatus('profile');
            }}
            className={style}
            src="/profile.svg"
          />
        </div>
      )}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-4 right-4 z-10 p-4 bg-blue-600 text-white rounded-full shadow-md transition-opacity duration-300"
      >
        <img src="/menu.svg" className="w-8" />
      </div>
    </div>
  );
};

export default HomeMenu;
