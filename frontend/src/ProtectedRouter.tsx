import { useAuth } from './contexts/authContexts';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouter;