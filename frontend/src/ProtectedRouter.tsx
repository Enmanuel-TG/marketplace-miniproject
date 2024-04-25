import { useAuth } from './contexts/authContexts';
import { Outlet, useNavigate } from 'react-router-dom';
import  Loading  from './components/loading';

const ProtectedRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/auth', { replace: true });
    return <Loading />;
  }
  return <Outlet />;
};

export default ProtectedRouter;