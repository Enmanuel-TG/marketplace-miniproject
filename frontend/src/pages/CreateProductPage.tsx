import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import Input from '../components/ui/Input';
import { useProduct } from '../contexts/ProductContext';
import { categoryOptions, stateOptions } from '../utilities/select-option.utility';
import Button from '../components/ui/Button';
import HeadPage from '../components/HeadPage';
import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm<Product>();
  const { createProduct, errors, setProduct, setErrors } = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

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

  const onSubmit = async (data: Product): Promise<void> => {
    setIsLoading(true);
    const res = await createProduct(data);
    if (res) {
      toast.success(res.message, toastifyConfig);
      reset();
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
    <div>
      <HeadPage namePage="Create Product" />
      <div className="flex">
        <div className="max-w-3xl pt-20 px-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploader onFilesChange={handleFileChange} />
            <Input type="text" fieldname="Title" {...register('name', { required: true })} />
            <div className="flex w-full justify-between mt-5">
              <Input
                type="text"
                title="Enter a price with numbers (Example: 0, 0.0, 0.00)"
                pattern="^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$"
                fieldname="Price"
                {...register('price', { required: true })}
              />
              <Input
                type="text"
                pattern="^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$"
                title="Enter a price with numbers (Example: 0, 0.0, 0.00)"
                fieldname="Stock"
                {...register('stock', { required: true })}
              />
              <Input type="text" fieldname="Location" {...register('location', { required: true })} />
            </div>
            <div className="my-5 flex justify-between w-full gap-4">
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
            <div className="flex justify-end mt-5">
              <Button type="submit" fieldname="Create Product" disabled={isLoading} styles="p-3" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateProductPage;
