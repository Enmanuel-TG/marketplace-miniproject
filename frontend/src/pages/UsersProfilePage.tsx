import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Product, Profile } from '@/utilities/interfaces.utility';
import { getRating } from '@/services/rating.service';
import { useProduct } from '@/contexts/ProductContext';
import { filterStockProducts } from '@/utilities/filter-products.utility';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/Dialog';
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
  const triggerRef = useRef<HTMLButtonElement>(null);

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
        triggerRef.current?.click();
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
    <>
      <HeadPage namePage={'Profile'} />
      <div className="mt-6 mx-auto w-full md:max-w-[80%] p-[40px] sm:p-[30px] lg:p-[20px]">
        <div className="bg-background mt-10 mx-auto w-full p-[38px] lg:p-[25px] rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row md:gap-[64px] items-center lg:items-start">
            <img
              src={userData.photo}
              className="aspect-square rounded-full shadow-lg w-full max-w-[220px] lg:size-[220px] object-cover"
              alt={`${userData.name}'s profile`}
            />
            <div className="lg:text-left">
              <div className="flex flex-row items-center gap-4 mt-6">
                <p className="text-xl md:text-[30px] lg:text-[26px] font-semibold text-center">{userData.name}</p>
              </div>
              {userData.createdAt && (
                <div className="mt-[10px] text-[26px] sm:text-[16px] lg:text-[10px]">
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
              <div className="w-full mt-3 mr-3 border-gray-300 rounded-md">
                <p>{userData?.description}</p>
              </div>
              {isAdmin && user?.id !== userData.id && (
                <div>
                  <Dialog>
                    <DialogTrigger className='px-4 py-2 mt-2 mr-4'>
                      Change role
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center">Change role of this user</DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="flex justify-around w-5/6 m-auto gap-2 my-6">
                        {userData.role === 'admin' ? (
                          <Button
                            fieldname="Change to user"
                            onClick={() => {
                              changeRole(Number(userId), 'user');
                            }}
                            styles="py-2 px-4"
                          />
                        ) : (
                          <Button
                            fieldname="Change to admin"
                            onClick={() => {
                              changeRole(Number(userId), 'admin');
                            }}
                            styles="py-2 px-4"
                          />
                        )}
                      </DialogDescription>
                      <DialogClose ref={triggerRef}>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10">
          <hr />
          <p className="mb-3 mt-7 text-xl md:text-[30px] sm:text-[16px] lg:text-[16px] font-semibold">
            Product history
          </p>
          <label htmlFor="showAvailableOnly" className="mb-16">
            <Switch
              name="showAvailableOnly"
              id="showAvailableOnly"
              checked={isAvailable}
              onCheckedChange={() => setIsAvailable(!isAvailable)}
            />
            <span className="pl-2">Show available only</span>
          </label>
          <div className="max-w-screen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard title="See Details" key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExternalProfilePage;
