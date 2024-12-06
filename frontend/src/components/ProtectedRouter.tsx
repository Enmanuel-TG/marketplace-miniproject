import { useAuth } from '../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Loading from './Loading';
import { useEffect, useState } from 'react';

const ProtectedRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/', { replace: true });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRouter;
