import { logoutRequest } from '../api/auth';
import { useAuth } from '../contexts/authContexts';
import CreateProductPage from './createProductPage';

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
      <CreateProductPage/>
    </div>
  );
};
export default HomePages;
