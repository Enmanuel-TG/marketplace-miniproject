import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import  IconProfile  from '../components/MyIconProfile';
import SearchBar from '../components/SearchBar';

const HomePages = () => {
  const { allProducts } = useProduct();
  return (
    <div className="flex flex-col">
      <div className='flex'>
        <SearchBar />
        <IconProfile className='mt-1 mx-3 bg-white w-11 h-11 rounded-full object-cover no-select no-drag self-end'/>
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

