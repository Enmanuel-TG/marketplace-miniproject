import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';

const HomePages = () => {
  const { allProducts } = useProduct();
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col">
      <div className='flex flex-row'>
        <SearchBar />
        {isAuthenticated && <img className='m-3 bg-white w-11 h-11 rounded-full object-cover no-select no-drag' draggable="false" src={user?.photo}/>}
      </div>
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePages;
