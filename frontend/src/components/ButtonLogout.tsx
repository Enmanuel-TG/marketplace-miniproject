import { logoutRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

const ButtonLogout = () => {
  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch (error) {
      alert(error); //TODO fix this
    }
  };
  return (
    <div>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default ButtonLogout;
