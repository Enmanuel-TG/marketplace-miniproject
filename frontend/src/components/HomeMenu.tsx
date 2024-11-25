import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';

const style = 'bg-white m-2 rounded-full hover:bg-gray-400 hover:cursor-pointer aspect-square object-contain';

export const HomeMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
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
    <div className="cursor-pointer">
      {menuOpen && (
        <div className="flex flex-col cursor-pointer">
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
          {isAuthenticated && user?.role === 'admin' && (
            <img
              title="Role-manager"
              onClick={() => {
                verifyAuthStatus('role-manager');
              }}
              className={style}
              src="/role.svg"
            />
          )}
        </div>
      )}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-4 right-4 z-10 p-4 bg-blue-600 text-white rounded-full shadow transition-opacity duration-300"
      >
        <svg
          id="Menu--Streamline-Carbon.svg"
          className="size-8 fill-secondary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-0.5 -0.5 16 16"
          height="16"
          width="16"
        >
          <desc>Menu Streamline Icon: https://streamlinehq.com</desc>
          <defs></defs>
          <title>Menu</title>
          <path d="M1.875 2.8125h11.25v0.9375H1.875Z" strokeWidth="1"></path>
          <path d="M1.875 11.25h11.25v0.9375H1.875Z" strokeWidth="1"></path>
          <path d="M1.875 5.625h11.25v0.9375H1.875Z" strokeWidth="1"></path>
          <path d="M1.875 8.4375h11.25v0.9375H1.875Z" strokeWidth="1"></path>
          <path id="_Transparent_Rectangle_" d="M0 0h15v15H0Z" fill="none" strokeWidth="1"></path>
        </svg>
      </button>
    </div>
  );
};

export default HomeMenu;
