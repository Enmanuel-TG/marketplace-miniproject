import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FieldValues, useForm } from 'react-hook-form';
import { createOrUpdateRating } from '../services/rating.service';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { toastifyConfig } from '@/utilities/toastify.utility';

const star = (
  <svg
    className="w-4 h-4 text-yellow-300 me-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.92 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

const Rating = ({ data, allowRating }: { data: { average: number; count: number }; allowRating: boolean }) => {
  const { userData, isAuthenticated } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData: FieldValues) => {
    const sellerId = userData?.id as number;
    if (!isAuthenticated || !sellerId) {
      toast.error('You must be logged in to add a rating.', toastifyConfig);
      return;
    }
    try {
      const res = await createOrUpdateRating(sellerId, formData.rating as number);
      if (res.status === 200) {
        toast.success('Rating added successfully', toastifyConfig);
      }
    } catch (error) {
      toast.error('Error adding rating', toastifyConfig);
    }
  };

  return (
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{star}</div>
        ))}
      <p className="ms-2 text-sm font-bold text-white">{data.average}</p>
      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
      <a href="#" className="text-sm font-medium text-white underline hover:no-underline dark:text-white">
        {data.count} reviews
      </a>
      {allowRating && (
        <Dialog>
          <DialogTrigger>
            <div className="ml-3 pb-1">
              <img src="/rating.svg" alt="Add Rating" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a review</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input fieldname="Add review" type="number" {...register('rating')} min="1" max="5" />
                  <br />
                  <Button fieldname="Submit" type="submit" className="w-full" />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Rating;
