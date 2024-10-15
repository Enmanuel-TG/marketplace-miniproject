import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import { useProduct } from '../contexts/ProductContext';
import { categoryOptions, stateOptions } from '../utilities/selectOption';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '@/components/ImageUploader';
import HeadPage from '@/components/HeadPage';

const UpdateProductPage = () => {
  const { product, updateProduct, errors } = useProduct();
  const { register, handleSubmit, setValue } = useForm<Product>({ defaultValues: product });
  const Navigate = useNavigate();

  useEffect(() => {
    if (!product || Object.keys(product).length === 0) {
      toast.error('Product not found', toastifyConfig);
      setTimeout(() => {
        Navigate('/');
      }, 6000);
      return;
    }
  }, [product]);

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [errors]);

  const onSubmit = (data: Product) => {
    const res = updateProduct(data);
    console.log(res);
  };

  const handleFileChange = (files: File[]) => {
    setValue('photos', files);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <HeadPage namePage="Update Product" />
      <div className="max-w-3xl p-5 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader onFilesChange={handleFileChange} initialFiles={[]} />
          <Input type="text" fieldname="Title" {...register('name', { required: true })} />
          <div className="flex w-full justify-between">
            <Input type="text" fieldname="Price" {...register('price', { required: true })} />
            <Input type="text" fieldname="Stock" {...register('stock', { required: true })} />
            <Input type="text" fieldname="Location" {...register('location', { required: true })} />
          </div>
          <div className="my-4 flex justify-between w-full gap-4">
            <div className="w-full">
              <label htmlFor="category" className="block text-white">
                Category
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
              <label htmlFor="state" className="block text-white">
                State
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
          <Input type="text" fieldname="Description" {...register('description', { required: true })} />
          <div>
            <Button type="submit" fieldname="Update Product" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
