import { useAuth } from './contexts/authContexts';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (<h1>Loading...</h1>);
  }
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouter;