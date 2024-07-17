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
      <div className="max-w-screen mx-auto flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePages;
