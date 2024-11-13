import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.phoneNumber === '0000000000') {
      navigate('/profile');
      toast.error('Please change the number phone', toastifyConfig);
    }
  }, [user]);

  return <>{children}</>;
};
export default Layout;
