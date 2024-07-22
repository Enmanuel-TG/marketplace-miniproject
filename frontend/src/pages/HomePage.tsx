import ButtonLogout from '../components/ButtonLogout';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';

const HomePages = () => {
  const { products } = useProduct();

  return (
    <div className="flex flex-col ">
      <h1>Home pages</h1>
      <ButtonLogout />
      <br />
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>


    </div>
  );
};

export default HomePages;
