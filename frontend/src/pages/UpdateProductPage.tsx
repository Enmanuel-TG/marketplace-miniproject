import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import { useProduct } from '../contexts/ProductContext';
import { categoryOptions, stateOptions } from '../utilities/select-option.utility';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '@/components/ImageUploader';
import HeadPage from '@/components/HeadPage';
import Textarea from '@/components/ui/Textarea';

const UpdateProductPage = () => {
  const { product, updateProduct, errors, setProduct, setErrors } = useProduct();
  const { register, handleSubmit, setValue } = useForm<Product>({ defaultValues: product });
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      toast.error('Product not found', toastifyConfig);
      navigate('/');
    }
  }, [product]);

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

  const onSubmit = async (data: Product) => {
    setIsLoading(true);
    const res = await updateProduct(data);
    if (res) {
      toast.success(res.message, toastifyConfig);
    }
    if (res.product.id) {
      setProduct(res.product);
      navigate(`/product/id:${res.product.id}`);
    }
  };

  const handleFileChange = (files: File[]) => {
    setValue('photos', files);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeadPage namePage="Update Product" />
      <div className="max-w-3xl p-5 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader onFilesChange={handleFileChange} imgs={product?.photos as unknown as string[]} />
          <Input type="text" fieldname="Title" required {...register('name', { required: true })} />
          <div className="flex w-full justify-between mt-5">
            <Input type="text" fieldname="Price" required {...register('price', { required: true })} />
            <Input type="text" fieldname="Stock" required {...register('stock', { required: true })} />
            <Input type="text" fieldname="Location" required {...register('location', { required: true })} />
          </div>
          <div className="my-5 flex justify-between w-full gap-4">
            <div className="w-full">
              <label htmlFor="category" className="block mb-1">
                Category{' '}
                <span className="text-red-500" title="The condition is required.">
                  *
                </span>
              </label>
              <select
                id="category"
                {...register('category', { required: true })}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="state" className="block mb-1">
                State{' '}
                <span className="text-red-500" title="The condition is required.">
                  *
                </span>
              </label>
              <select
                id="state"
                {...register('state', { required: true })}
                className="w-full p-3 border border-gray-300 rounded"
              >
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Textarea fieldname="Description" required {...register('description', { required: true })} />
          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              fieldname={isLoading ? 'Updating...' : 'Update'}
              styles="p-3 w-full md:w-fit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
