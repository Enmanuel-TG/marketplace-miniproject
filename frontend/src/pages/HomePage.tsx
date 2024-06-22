//import { logoutRequest } from '../services/auth.service';
//import { useAuth } from '../contexts/AuthContext';
import ButtonLogout from '../components/ButtonLogout';
import { useProduct } from '../contexts/ProductContext';

const HomePages = () => {
  const { getAllProducts } = useProduct();
  //const { setIsAuthenticated } = useAuth();
  // const logout = async () => {
  //   await logoutRequest();
  //   setIsAuthenticated(false);
  // };
  return (
    <div>
      <h1>Home pages</h1>
      <button onClick={() => getAllProducts()}>Click</button>
      <ButtonLogout />
      <br />
      <br />
    </div>
  );
};

export default HomePages;
