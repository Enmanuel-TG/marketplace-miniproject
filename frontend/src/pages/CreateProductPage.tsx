import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import Input from '../components/ui/Input';
import { useProduct } from '../contexts/ProductContext';
import { categoryOptions, stateOptions } from '../utilities/selectOption';
import Button from '../components/ui/Button';
import HeadPage from '../components/HeadPage';
import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CreateProductPage = () => {
  const { register, handleSubmit, setValue } = useForm<Product>();
  const { createProduct, errors } = useProduct();
  const { reset } = useForm<Product>();

  useEffect(() => {
    errors.map((error) => toast.error(error, toastifyConfig));
  }, [errors]);

  const onSubmit = async (data: Product): Promise<void> => {
    const res = await createProduct(data);
    if (res) {
      toast.success(res.message, toastifyConfig);
      reset();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setValue('photos', filesArray);
    }
  };

  return (
    <div>
      <HeadPage namePage="Create Product" />
      <div className="flex min-h-screen">
        <div className="max-w-3xl pt-12 px-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" fieldname="Title" {...register('name', { required: true })} />
            <Input
              type="file"
              fieldname="Select Image"
              className="bg-white"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <div className="flex w-full justify-between">
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
            <div className="my-4 flex justify-between w-full gap-4">
              <div className="w-full">
                <label defaultValue="" htmlFor="category" className="block text-white">
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
              <Button type="submit" fieldname="Create Product" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
