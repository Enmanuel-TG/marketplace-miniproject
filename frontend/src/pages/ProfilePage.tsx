import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
import { ButtonBack } from '../components/ui/ButtonBack';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { ProductCard } from '@/components/ProductCard';
import { useProduct } from '@/contexts/ProductContext';
import Input from '@/components/ui/Input';
import { Product, UpdateUser } from '@/utilities/interfaces.utility';
import { updateDescription, updateUserRequest } from '../services/auth.service';
import Button from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { filterStockProducts } from '@/utilities/filter-products.utility';
import axios from 'axios';
import { getRating } from '../services/rating.service';
import Rating from '@/components/Rating';
import { useForm } from 'react-hook-form';

interface RatingProps {
  average: number;
  count: number;
}

const ProfilePage = () => {
  const { user, setUser, setIsEdit, errors, setErrors, logOut } = useAuth();
  const [previewPhoto, setPreviewPhoto] = useState<string | undefined>(user?.photo);
  const { getAllUSerProducts, allProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [rating, setRating] = useState<RatingProps>({ average: 0, count: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const isFirstRender = useRef(true);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, setValue } = useForm<UpdateUser>({
    defaultValues: {
      name: '',
      birthday: '',
      phoneNumber: '',
    },
  });

  const getUserRating = async (id: number) => {
    const res = await getRating(id);
    setRating(res.data);
  };
  const onSubmit = async (data: UpdateUser) => {
    if (!user) return;
    const newData = {
      ...data,
      birthday: new Date(data.birthday).toISOString(),
    };
    try {
      const res = await updateUserRequest(newData);
      if (res.status === 200) {
        setUser({
          ...user,
          ...newData,
        });
        toast.success('User updated successfully', toastifyConfig);
      }
    } catch (error) {
      setValue('name', user?.name);
      setValue('birthday', user?.birthday ? new Date(user?.birthday).toISOString().split('T')[0] : '');
      setValue('phoneNumber', user?.phoneNumber);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    setValue('name', user?.name);
    setValue('birthday', user?.birthday ? new Date(user?.birthday).toISOString().split('T')[0] : '');
    setValue('phoneNumber', user?.phoneNumber);
  }, [user, setValue]);

  useEffect(() => {
    if (user) {
      getUserRating(user?.id as number);
    }
  }, [user]);

  useEffect(() => {
    if (user?.phoneNumber === '0000000000') {
      triggerRef.current?.click();
    }
  }, []);

  const changeDescription = async (data: UpdateUser) => {
    const description = data.description as string;
    setIsOpen(true);
    if (!user) return;
    try {
      const res = await updateDescription({ description } as unknown as string);
      if (res.status === 200) {
        setUser({
          ...user,
          description,
        });
        toast.success('Description updated successfully', toastifyConfig);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setErrors([]);
      isFirstRender.current = false;
      return;
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [errors]);

  useEffect(() => {
    const filtered = filterStockProducts(allProducts, isAvailable);
    const filterUserProducts = filtered.filter((product) => product.userId === user?.id);
    setFilteredProducts(filterUserProducts);
  }, [allProducts, isAvailable]);

  useEffect(() => {
    getAllUSerProducts();
  }, []);

  return (
    <Dialog>
      <div className="flex mx-4">
        <ButtonBack className="mt-4" />
        <h1 className="text-3xl font-bold mb-8 ml-4 mt-4 no-drag no-select">Profile</h1>
      </div>
      <div>
        <div className="bg-background mt-10 mx-auto w-full max-w-[80vw] no-drag no-select p-[4vw] sm:p-[3vw] lg:p-[2vw] rounded-lg shadow-md">
          <Dialog>
            <DialogTrigger>
              <Button
                styles="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute right-5 top-5"
                fieldname="Log out"
              />
            </DialogTrigger>
            <DialogContent className="p-[3vw]">
              <DialogHeader>
                <DialogTitle className="text-[2vw] lg:text-[1vw] flex justify-center">
                  Are you sure you want to log out?
                </DialogTitle>
              </DialogHeader>
              <DialogClose>
                <button
                  className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={logOut}
                >
                  Log out
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <div className="flex flex-col lg:flex-row gap-[5vw] items-center lg:items-start">
            <div className="relative">
              <img
                src={user?.photo}
                className="no-select no-drag rounded-full shadow-lg w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] lg:w-[15vw] lg:h-[15vw] object-cover"
              />
              <DialogTrigger
                className="absolute bottom-[1vw] right-[1vw] px-[1vw] py-[0.5vw] bg-blue-500 rounded-lg"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </DialogTrigger>
            </div>
            <div className="text-center lg:text-left w-2/3">
              <Dialog>
                <div className="flex flex-row items-center gap-4">
                  <p className=" text-[3vw] lg:text-[2.5vw] font-semibold">{user?.name}</p>
                  <DialogTrigger ref={triggerRef}>
                    <img
                      src="/edit.svg"
                      alt="edit"
                      className="w-6 h-6 transition-all hover:w-7 hover:h-7"
                      title="Edit"
                    />
                  </DialogTrigger>
                </div>
                <DialogContent className="p-[3vw]">
                  <DialogHeader>
                    <DialogTitle className="text-[4vw] lg:text-[2vw]">Update user data</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Input type="text" fieldname="Name" {...register('name', { required: true })} />
                      <Input type="date" fieldname="Birthday" {...register('birthday', { required: true })} />
                      <Input type="text" fieldname="Phone Number" {...register('phoneNumber', { required: true })} />
                      <DialogClose>
                        <Button type="submit" fieldname="Update Profile" styles="p-2 mt-4" />
                      </DialogClose>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
              {user?.createdAt && (
                <div className=" mt-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:text-[1vw]">
                  Joined on{' '}
                  {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
              <div>
                <Rating allowRating={false} data={rating} />
              </div>
              <Dialog>
                <div className="flex flex-row">
                  <div className="w-full h-[7vw] mt-3 border mr-3 border-gray-300 rounded-md">
                    <p className="">{user?.description}</p>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change description</DialogTitle>
                      <form onSubmit={handleSubmit(changeDescription)}>
                        <textarea
                          className="w-full h-[10vw] border border-gray-300 rounded-lg p-2 resize-none"
                          {...register('description')}
                        ></textarea>
                        <Button fieldname="Update" disabled={isOpen} type="submit" styles="flex justify-center mt-4 p-2" />
                      </form>
                    </DialogHeader>
                  </DialogContent>
                  <div className="mt-4">
                    <DialogTrigger>
                      <img
                        src="/edit.svg"
                        alt="edit"
                        className="w-6 h-6 transition-all hover:w-7 hover:h-7"
                        title="Edit description"
                      />
                    </DialogTrigger>
                  </div>
                </div>
              </Dialog>
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
        <div className="max-w-screen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {filteredProducts.map((product) => (
            <ProductCard title="See Details" key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default ProfilePage;
