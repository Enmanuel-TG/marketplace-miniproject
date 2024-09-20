import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductCard } from '@/components/ProductCard';
import { useProduct } from '@/contexts/ProductContext';

const ProfilePage = () => {
  const { user, setIsEdit, errors } = useAuth();
  const [previewPhoto, setPreviewPhoto] = useState<string | undefined>(user?.photo);

  useEffect(() => {
    errors.map((error) => toast.error(error, toastifyConfig));
  }, [errors]);

  const { getAllUSerProducts, allProducts } = useProduct();
  useEffect(() => {
    getAllUSerProducts();
  }, []);

  return (
    <Dialog>
      <div>
        <div className="bg-gray-900 mt-10 mx-auto w-full max-w-[80vw] no-drag no-select p-[4vw] sm:p-[3vw] lg:p-[2vw] rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-[5vw] items-center lg:items-start">
            <div className="relative">
              <img
                src={user?.photo}
                className="no-select no-drag rounded-full shadow-lg w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] lg:w-[15vw] lg:h-[15vw] object-cover"
              />
              <DialogTrigger
                className="absolute bottom-[1vw] right-[1vw] px-[1vw] py-[0.5vw] bg-blue-500 text-white rounded-lg"
                onClick={() => setIsEdit(true)}>
                Edit
              </DialogTrigger>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-white mt-[2vw] text-[3vw] sm:text-[3vw] lg:text-[2.5vw] font-semibold">{user?.name}</p>
              {user?.createdAt && (
                <div className="text-white mt-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:text-[1vw]">
                  Joined on{' '}
                  {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogContent className="p-[3vw]">
          <DialogHeader>
            <DialogTitle className="text-[4vw] lg:text-[2vw]">Change your profile photo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img
              src={previewPhoto || user?.photo}
              className="w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] lg:w-[15vw] lg:h-[15vw] no-select no-drag rounded-full shadow-lg object-cover"
            />
            <GetPicture onPhotoChange={setPreviewPhoto} />
          </div>
        </DialogContent>
      </div>
      <br />
      <div className="w-[80vw] mx-auto">
        <hr />
        <p className="text-white mt-7 text-[3vw] sm:text-[1.5vw] lg:text-[1.5vw] font-semibold">Product history</p>
        <br />
        <br />
        <div className="max-w-screen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {allProducts.map((product) => (
            <ProductCard title="See Details" key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default ProfilePage;
