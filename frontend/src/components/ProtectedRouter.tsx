import { useAuth } from '../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { profileRequest } from '../services/auth.service';
import { useEffect } from 'react';

const ProtectedRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const checkAuth = async () => {
    try {
      const res = await profileRequest();
      if (!res.data) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return <Loading />;
  }
  return <Outlet />;
};

export default ProtectedRouter;
