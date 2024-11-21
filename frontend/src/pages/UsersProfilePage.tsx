import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Product, Profile } from '@/utilities/interfaces.utility';
import { getRating } from '@/services/rating.service';
import { useProduct } from '@/contexts/ProductContext';
import { filterStockProducts } from '@/utilities/filter-products.utility';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import Rating from '@/components/Rating';
import { Switch } from '@/components/ui/Switch';
import { ProductCard } from '@/components/ProductCard';
import Button from '@/components/ui/Button';
import HeadPage from '@/components/HeadPage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateRoleRequest } from '@/services/role.service';
import { toastifyConfig } from '@/utilities/toastify.utility';

interface RatingProps {
  average: number;
  count: number;
}

const ExternalProfilePage = () => {
  const { userData, getDataUser, user, setUserData } = useAuth();
  const { allProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rating, setRating] = useState<RatingProps>({ average: 0, count: 0 });
  const [isAvailable, setIsAvailable] = useState(true);
  const { id } = useParams<{ id: string }>();
  const userId = id?.split(':')[1];

  const getUserRating = async (id: number) => {
    const res = await getRating(id);
    setRating(res.data);
  };

  const changeRole = async (id: number, role: string) => {
    try {
      if (role === userData?.role) {
        toast.error('This user already has this role', toastifyConfig);
        return;
      }
      const res = await updateRoleRequest(id, role);
      if (res.status === 200) {
        setUserData({ ...userData, role } as Profile);
        toast.success(res.data.message, toastifyConfig);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message, toastifyConfig);
        }
      }
    }
  };

  useEffect(() => {
    if (userData !== ({} as Profile)) {
      getDataUser(Number(userId));
    }
  }, []);

  useEffect(() => {
    getUserRating(Number(userId));
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const userProducts = allProducts.filter((product) => product.userId === Number(userId));
      const filtered = filterStockProducts(userProducts, isAvailable);
      setFilteredProducts(filtered);
    }
  }, [allProducts, isAvailable]);

  useEffect(() => {
    if (user?.role === 'admin') {
      setIsAdmin(true);
    }
  }, [user]);

  if (!userData) {
    return <div>User no found</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <HeadPage namePage={'Profile'} />
        <div>
          {isAdmin && (
            <div>
              <Dialog>
                <DialogTrigger>
                  <div>
                    <Button fieldname="Role" styles="w-14 h-8 mt-4 mr-4" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Change role of this user</DialogTitle>
                  </DialogHeader>
                  <DialogClose>
                    <div className="flex justify-around w-5/6 m-auto gap-2 my-6">
                      <Button
                        fieldname="Change to user"
                        onClick={() => {
                          changeRole(Number(userId), 'user');
                        }}
                        styles="py-2 px-4"
                      />
                      <Button
                        fieldname="Change to admin"
                        onClick={() => {
                          changeRole(Number(userId), 'admin');
                        }}
                        styles="py-2 px-4"
                      />
                    </div>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 mx-auto w-full max-w-[90vw] p-[4vw] sm:p-[3vw] lg:p-[2vw] ">
        <div className="rounded-lg ">
          <div className="flex flex-col lg:flex-row gap-[5vw] items-center lg:items-start">
            <img
              src={userData.photo}
              className="rounded-full shadow-lg w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] lg:w-[15vw] lg:h-[15vw] object-cover m-6 ml-6"
              alt={`${userData.name}'s profile`}
            />
            <div className="text-center lg:text-left">
              <div className="flex flex-row items-center gap-4 mt-6">
                <p className=" text-[3vw] lg:text-[2.5vw] font-semibold">{userData.name}</p>
              </div>
              {userData.createdAt && (
                <div className=" mt-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:text-[1vw]">
                  Joined on{' '}
                  {new Date(userData.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
              <div>
                <Rating allowRating={true} data={rating} />
              </div>
              <div className="w-full h-[7vw] mt-3 border mr-3 border-gray-300 rounded-md">
                <p>{userData?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10">
          <hr />
          <p className=" mt-7 text-[3vw] sm:text-[1.5vw] lg:text-[1.5vw] font-semibold">Product history</p>
          <label htmlFor="showAvailableOnly">
            <Switch
              name="showAvailableOnly"
              id="showAvailableOnly"
              checked={isAvailable}
              onCheckedChange={() => setIsAvailable(!isAvailable)}
            />
            <span className="pl-2">Show available only</span>
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
    </div>
  );
};

export default ExternalProfilePage;
