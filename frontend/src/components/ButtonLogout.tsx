import { logoutRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { toastifyConfig } from '@/utilities/toastify.utility';

const ButtonLogout = () => {
  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch (error) {
      toast.error('Error logging out', toastifyConfig);
    }
  };
  return (
    <div>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default ButtonLogout;
