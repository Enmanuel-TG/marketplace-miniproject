import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const stateOptions = [
  { value: 'new', label: 'New' },
  { value: 'used_like_new', label: 'Used - Like New' },
  { value: 'used', label: 'Used' },
];

const categoryOptions = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'tools', label: 'Tools' },
  { value: 'computers', label: 'Computers' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'vehicles', label: 'Vehicles' },
];

const CreateProductPage = () => {
  const { register, handleSubmit } = useForm<Product>();

  const onSubmit = (data: Product) => {
    console.log(data);
  };

  return (
    <div className='w-2/3 m-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div> <Input type="text" fieldname="Name" {...register('name', { required: true })} /></div>
        <div> <Input type="number" fieldname="Price" {...register('price', { required: true })} /></div>
        <div> <Input type="text" fieldname="Location" {...register('location', { required: true })} /></div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" {...register('category', { required: true })}>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <select id="state" {...register('state', { required: true })}>
            {stateOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div> <Input type="number" fieldname="Stock" {...register('stock', { required: true })} /></div>
        <div> <Input type="text" fieldname="Description" className='' {...register('description', { required: true })} /></div>
        <Button type="submit" fieldname='Create' />
      </form>
    </div>
  );
};

export default CreateProductPage;




