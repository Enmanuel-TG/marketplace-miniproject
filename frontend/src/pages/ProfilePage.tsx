import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
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
import HeadPage from '../components/HeadPage';
import Textarea from '@/components/ui/Textarea';
import { LEGAL_AGE } from '@/utilities/consts.utility';
import calculateAge from '@/utilities/calculate-age.utility';

interface RatingProps {
  average: number;
  count: number;
}

const ProfilePage = () => {
  const { user, setUser, setIsEdit, errors, setErrors } = useAuth();
  const [previewPhoto, setPreviewPhoto] = useState<string | undefined>(user?.photo);
  const { getAllUSerProducts, allProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [rating, setRating] = useState<RatingProps>({ average: 0, count: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const isFirstRender = useRef(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const userDataRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLButtonElement>(null);

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

    if (data.phoneNumber === '0000000000') {
      toast.error('Please enter a valid phone number', toastifyConfig);
      return;
    }

    const parsedBirthday = new Date(data.birthday);
    if (calculateAge(parsedBirthday) < LEGAL_AGE) {
      toast.error('You need to be of legal age.', toastifyConfig);
      return;
    }

    const newData = {
      ...data,
      birthday: parsedBirthday.toISOString(),
    };

    try {
      const res = await updateUserRequest(newData);
      if (res.status === 200) {
        setUser({
          ...user,
          ...newData,
        });
        userDataRef.current?.click();
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
        descriptionRef.current?.click();
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
      <HeadPage namePage="Profile" />
      <div className="mb-8">
        <div className="bg-background mt-10 mx-auto w-full md:max-w-[80%] p-[52px] sm:p-[38px] lg:p-[25px] rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-[64px] items-center lg:items-start">
            <div className="relative w-full max-w-[200px] md:w-fit">
              <img
                src={user?.photo}
                className="aspect-square rounded-full shadow-lg w-full max-w-none md:max-w-[220px] lg:size-[220px] object-cover"
              />

              {user?.phoneNumber !== '0000000000' && (
                <DialogTrigger
                  className="absolute bottom-[16px] right-[16px] px-[16px] py-[8px] bg-blue-500 rounded-lg text-white"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </DialogTrigger>
              )}
            </div>
            <div className="md:text-center lg:text-left w-full md:w-2/3">
              <Dialog>
                <div className="flex flex-row items-center gap-4">
                  <p className="text-xl md:text-2xl font-semibold text-left">{user?.name}</p>
                  <DialogTrigger ref={triggerRef}>
                    <img
                      src="/edit.svg"
                      alt="edit"
                      className="aspect-square size-4 md:size-6 transition-all hover:w-7 hover:h-7"
                      title="Edit"
                    />
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-lg ">
                      {user?.phoneNumber === '0000000000' ? 'Complete your profile' : 'Update profile'}
                    </DialogTitle>
                  </DialogHeader>

                  {user?.phoneNumber !== '0000000000' && (
                    <p>
                      You registered with Google. You must complete your profile by adding your phone number and date of
                      birth to continue.
                    </p>
                  )}
                  <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Input type="text" required fieldname="Name" {...register('name', { required: true })} />
                      <Input type="date" required fieldname="Birthday" {...register('birthday', { required: true })} />
                      <Input
                        type="text"
                        required
                        fieldname="Phone Number"
                        {...register('phoneNumber', { required: true })}
                      />
                      <Button type="submit" fieldname="Update Profile" styles="p-2 mt-4" />
                      <DialogClose>
                        <button ref={userDataRef} aria-hidden="true"></button>
                      </DialogClose>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
              {user?.createdAt && (
                <div className="mb-3 text-gray-600 text-left">
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
                  <div className="mt-3 mr-3 ">
                    {user?.description ? (
                      <p className="">{user.description}</p>
                    ) : (
                      <p className="text-gray-500">No description yet.</p>
                    )}
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-3">Change description</DialogTitle>
                      <form onSubmit={handleSubmit(changeDescription)}>
                        <Textarea
                          fieldname="Description"
                          defaultValue={user?.description}
                          className="w-full min-h-[128px] border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...register('description')}
                        ></Textarea>
                        <Button
                          fieldname="Update"
                          disabled={isOpen}
                          type="submit"
                          styles="flex justify-center mt-4 p-2"
                        />
                      </form>
                    </DialogHeader>
                  </DialogContent>
                  <div className="mt-4">
                    {user?.phoneNumber !== '0000000000' && (
                      <DialogTrigger>
                        <img
                          src="/edit.svg"
                          alt="edit"
                          className="aspect-square size-4 transition-all hover:w-5 hover:h-7"
                          title="Edit description"
                        />
                      </DialogTrigger>
                    )}
                    <DialogClose>
                      <button ref={descriptionRef}></button>
                    </DialogClose>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
        <DialogContent className="p-[38px]">
          <DialogHeader>
            <DialogTitle className="text-[50px] lg:text-[25px]">Change your profile photo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img
              src={previewPhoto || user?.photo}
              className="aspect-square size-[320px] sm:size-[256px] lg:size-[192px] rounded-full shadow-lg object-cover"
            />
            <GetPicture onPhotoChange={setPreviewPhoto} />
          </div>
        </DialogContent>
      </div>
      <div className="w-[80%] mx-auto mb-10">
        <hr />
        <p className="mb-3 mt-7 text-xl md:text-[38px] sm:text-[20px] font-semibold">Product history</p>
        <label htmlFor="showAvailableOnly">
          <Switch
            className="mb-5"
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
    </Dialog>
  );
};

export default ProfilePage;
