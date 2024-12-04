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
  const [hasImage, setHasImage] = useState(false);
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
    try {
      setIsLoading(true);
      if (!hasImage) {
        toast.error('Image is required', toastifyConfig);
        return;
      }
      const res = await updateProduct(data);
      if (res) {
        toast.success(res.message, toastifyConfig);
      }
      if (res.product.id) {
        setProduct(res.product);
        navigate(`/product/id:${res.product.id}`);
      }
    } catch (error) {
      toast.error('Something went wrong in creating the product. Try again.', toastifyConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (files: File[]) => {
    setValue('photos', files);
    setHasImage(files.length !== 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeadPage namePage="Update Product" />
      <div className="max-w-3xl p-5 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader onFilesChange={handleFileChange} imgs={product?.photos as unknown as string[]} />
          <Input type="text" fieldname="Title" required {...register('name', { required: true })} />
          <div className="flex w-full justify-between mt-5">
            <Input
              type="text"
              required
              title="Enter a price greater than 0 (e.g., 0.01, 1, 1.99)"
              pattern="^(?!0(\.0{1,2})?$)([1-9][0-9]*|0\.[1-9][0-9]?|[1-9][0-9]*\.[0-9]{1,2})$"
              fieldname="Price"
              {...register('price', { required: true })}
            />
            <Input
              type="text"
              required
              title="Enter a whole number greater than 0"
              pattern="^[1-9][0-9]*$"
              fieldname="Stock"
              {...register('stock', { required: true })}
            />
            <Input type="text" required fieldname="Location" {...register('location', { required: true })} />

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
          <div className="flex justify-between mt-5">
            <Button
              fieldname="Cancel"
              onClick={() => navigate(`/product/id:${product.id} `)}
              disabled={isLoading}
              styles="p-2 w-full md:w-fit"
            />
            <Button
              type="submit"
              fieldname={isLoading ? 'Updating...' : 'Update'}
              styles="p-2 mx-3 w-full md:w-fit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
