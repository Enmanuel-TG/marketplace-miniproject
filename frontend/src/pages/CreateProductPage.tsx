import React from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useProduct } from '../contexts/ProductContext';

const stateOptions = [
  { value: 'new', label: 'New' },
  { value: 'used like new', label: 'Used - Like New' },
  { value: 'used', label: 'Used' },
];

const categoryOptions = [
  { value: 'others', label: 'Others' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'tools', label: 'Tools' },
  { value: 'video_games', label: 'Video Games' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'sports', label: 'Sports' },
  { value: 'garments', label: 'Garments' },
  { value: 'services', label: 'Services' },
];

const CreateProductPage = () => {
  const { register, handleSubmit, setValue } = useForm<Product>();
  const { createProduct } = useProduct();

  const onSubmit = (data: Product) => {
    console.log(data.photos);
    createProduct(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setValue('photos', filesArray);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100'>
      <div className='max-w-3xl p-5 m-auto bg-white border border-gray-200 rounded-lg shadow'>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Create Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" fieldname="Title" {...register('name', { required: true })} />
          <Input type="file" fieldname='Select Image' onChange={handleFileChange} accept='image/*' multiple />
          <div className='flex w-full justify-between'>
            <Input type=" text" fieldname="Price" {...register('price', { required: true })} />
            <Input type="text" fieldname="Stock" {...register('stock', { required: true })} />
            <Input type="text" fieldname="Location" {...register('location', { required: true })} />
          </div>
          <div className='my-4 flex justify-between w-full gap-4'>
            <div className='w-full'>
              <label htmlFor="category" className='block'>Category</label>
              <select id="category" {...register('category', { required: true })} className='w-full p-3 border border-gray-300 rounded'>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              <label htmlFor="state" className='block'>State</label>
              <select id="state" {...register('state', { required: true })} className='w-full p-3 border border-gray-300 rounded'>
                {stateOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <Input type="text" fieldname="Description" {...register('description', { required: true })} />
          <div>
            <Button type="submit" fieldname='Create Product' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
