import { logoutRequest } from '../api/auth';
import { useAuth } from '../contexts/authContexts';

const buttonLogout = () => {

  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    try {
      const res = await logoutRequest();
      console.log(res);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={logout}></button>
    </div>
  );
};

export default buttonLogout;