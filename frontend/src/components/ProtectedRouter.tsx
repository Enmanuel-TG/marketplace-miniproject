import { useAuth } from '../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const ProtectedRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    navigate('/', { replace: true });
    return <Loading />;
  }

  return <Outlet />;
};

export default ProtectedRouter;
