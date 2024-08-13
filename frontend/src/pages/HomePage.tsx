import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import  IconProfile  from '../components/MyIconProfile';
import SearchBar from '../components/SearchBar';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePages = () => {
  const { allProducts, errors } = useProduct();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loginPage = () => {
    navigate('/login');
  };
  const registerPage = () => {
    navigate('/register');
  };

  useEffect(() => {
    errors.map((error) => toast.error(error, toastifyConfig));
  }, [errors]);

  return (
    <div className="flex flex-col">
      <div className='flex'>
        <SearchBar />
        {isAuthenticated ? <IconProfile className='mt-1 mx-3 bg-white w-11 h-11 rounded-full object-cover no-select no-drag self-end' /> : <div className='flex h-10 mt-5'>
          <button className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3" onClick={registerPage} >Register</button>
          <button className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-3 px-3" onClick={loginPage} >Login</button></div>}
      </div>
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <a
        href="#top"
        className="fixed bottom-4 right-4 z-10 p-3 bg-blue-600 text-white rounded-full shadow-md transition-opacity duration-300"
        aria-label="Scroll to top"
      >
      </a>
    </div>
  );
};

export default HomePages;

