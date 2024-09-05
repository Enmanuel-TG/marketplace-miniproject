import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePages = () => {
  const { allProducts, errors } = useProduct();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    errors && errors.map((error) => toast.error(error, toastifyConfig));
  }, [errors]);

  return (
    <div className="flex flex-col">
      <div className='flex'>
        <SearchBar />
      </div>
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='fixed bottom-10 right-4 z-10 py-11 text-white rounded-full shadow-md transition-opacity duration-300 '>
        {menuOpen && <div className='flex flex-col'>
          <img onClick={() => {navigate('/create-product');}} className="bg-white my-2 p-2 placeholder: rounded-full shadow-md hover:bg-gray-400" src="/create.svg"/>
          <img onClick={() => {navigate('/profile');}} className="bg-white my-2 p-2 placeholder: rounded-full shadow-md hover:bg-gray-400" src="/profile.svg"/>
          <img onClick={() => {navigate('/profile');}} className="bg-white my-2 p-2 placeholder: rounded-full shadow-md hover:bg-gray-400" src="/myProduct.svg"/>
        </div>}
        <div onClick={() => setMenuOpen(!menuOpen)} className="fixed bottom-4 right-4 z-10 p-4 bg-blue-600 text-white rounded-full shadow-md transition-opacity duration-300 ">
          <img src="/menu.svg" className='w-8'/>
        </div>
      </div>
    </div>
  );
};
export default HomePages;

