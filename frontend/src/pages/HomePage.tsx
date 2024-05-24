import { logoutRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

const HomePages = () => {
  const { setIsAuthenticated } = useAuth();
  const logout = async () => {
    await logoutRequest();
    setIsAuthenticated(false);
  };
  return (
    <div>
      <h1>Home pages</h1>
      <button onClick={logout}>Click</button>
      <br/>
      <br/>
    </div>
  );
};

export default HomePages;
