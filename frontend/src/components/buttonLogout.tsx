import { logoutRequest } from '../api/auth';
import { useAuth } from '../contexts/authContexts';

const buttonLogout = () => {

  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch (error) {
      alert(error);//TODO fix this
    }
  };
  return (
    <div>
      <button onClick={logout}></button>
    </div>
  );
};

export default buttonLogout;