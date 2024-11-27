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
import Textarea from '@/components/ui/Textarea';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm<Product>();
  const { createProduct, errors, setProduct, setErrors } = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const [hasImage, setHasImage] = useState(false);
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
    try {
      setIsLoading(true);
      if (!hasImage) {
        toast.error('Image is required', toastifyConfig);
        return;
      }
      const res = await createProduct(data);
      if (res) {
        toast.success(res.message, toastifyConfig);
        reset();
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
    <div>
      <HeadPage namePage="Create Product" />
      <div className="flex">
        <div className="max-w-3xl pt-20 px-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploader onFilesChange={handleFileChange} />
            <Input required type="text" fieldname="Title" {...register('name', { required: true })} />
            <div className="flex w-full justify-between mt-5">
              <Input
                type="text"
                required
                title="Enter a price with numbers (Example: 0, 0.0, 0.00)"
                pattern="^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$"
                fieldname="Price"
                {...register('price', { required: true })}
              />
              <Input
                type="text"
                required
                pattern="^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$"
                title="Enter a price with numbers (Example: 0, 0.0, 0.00)"
                fieldname="Stock"
                {...register('stock', { required: true })}
              />
              <Input type="text" required fieldname="Location" {...register('location', { required: true })} />
            </div>
            <div className="my-5 flex justify-between w-full gap-4">
              <div className="w-full">
                <label htmlFor="category" className="block mb-1">
                  Category{' '}
                  <span className="text-red-500" title="The category is required.">
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
                  Condition{' '}
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
            <Textarea required fieldname="Description" {...register('description', { required: true })} />
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                fieldname={isLoading ? 'Creating...' : 'Create Product'}
                disabled={isLoading}
                styles="p-3 mb-3 w-full md:w-fit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateProductPage;
