import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Product, Profile } from '@/utilities/interfaces.utility';
import { getRating } from '@/services/rating.service';
import { useProduct } from '@/contexts/ProductContext';
import { filterStockProducts } from '@/utilities/filter-products.utility';
import Rating from '@/components/Rating';
import { Switch } from '@/components/ui/switch';
import { ProductCard } from '@/components/ProductCard';

interface RatingProps {
  average: number;
  count: number;
}

const ExternalProfilePage = () => {
  const { userData, getDataUser } = useAuth();
  const { getAllUSerProducts, allProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [rating, setRating] = useState<RatingProps>({ average: 0, count: 0 });
  const [isAvailable, setIsAvailable] = useState(true);
  const { id } = useParams<{ id: string }>();
  const userId = id?.split(':')[1];

  const getUserRating = async (id: number) => {
    const res = await getRating(id);
    setRating(res.data);
  };

  useEffect(() => {
    if (userData === ({} as Profile)) return;
    getDataUser(Number(userId));
    getUserRating(Number(userId));
    getAllUSerProducts();
  }, []);

  useEffect(() => {
    const filtered = filterStockProducts(allProducts, isAvailable);
    setFilteredProducts(filtered);
  }, [allProducts, isAvailable]);

  if (!userData) {
    return <div>User no found</div>;
  }

  return (
    <div className="mt-10 mx-auto w-full max-w-[80vw] no-drag no-select p-[4vw] sm:p-[3vw] lg:p-[2vw] ">
      <div className="bg-gray-900 rounded-lg ">
        <div className="flex flex-col lg:flex-row gap-[5vw] items-center lg:items-start">
          <div className="">
            <img
              src={userData.photo}
              className="no-select no-drag rounded-full shadow-lg w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] lg:w-[15vw] lg:h-[15vw] object-cover my-6 ml-6"
              alt={`${userData.name}'s profile`}
            />
          </div>
          <div className="text-center lg:text-left">
            <div className="flex flex-row items-center gap-4 mt-6">
              <p className="text-white text-[3vw] lg:text-[2.5vw] font-semibold">{userData.name}</p>
            </div>
            {userData.createdAt && (
              <div className="text-white mt-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:text-[1vw]">
                Joined on{' '}
                {new Date(userData.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
            <div>
              <Rating data={rating} />
            </div>
            <div className="w-full h-[7vw] mt-3 border mr-3 border-gray-300 rounded-md">
              <p className="text-white">{userData?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10">
        <hr />
        <p className="text-white mt-7 text-[3vw] sm:text-[1.5vw] lg:text-[1.5vw] font-semibold">Product history</p>
        <label htmlFor="showAvailableOnly">
          <Switch
            name="showAvailableOnly"
            id="showAvailableOnly"
            checked={isAvailable}
            onCheckedChange={() => setIsAvailable(!isAvailable)}
          />
          <span className="text-white pl-2">Show available only</span>
        </label>
        <br />
        <br />
        <div className="max-w-screen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard title="See Details" key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExternalProfilePage;
