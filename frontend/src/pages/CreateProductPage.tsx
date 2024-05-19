import { useForm } from 'react-hook-form';
import { Product } from '../utilities/interfaces.utility';

const CreateProductPage = () => {
  const { register, handleSubmit } = useForm<Product>();

  const onSubmit = (data: Product) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div> <input type="text" placeholder="Name" {...register('name')} /></div>
        <div> <input type="number" placeholder="Price" {...register('price')} /></div>
        <div> <input type="text" placeholder="Description" {...register('description')} /></div>
        <div> <input type="text" placeholder="Location" {...register('location')} /></div>
        <div> <input type="text" placeholder="State" {...register('state')} /></div>
        <div> <input type="text" placeholder="Category" {...register('category')} /></div>
        <div> <input type="number" placeholder="Stock" {...register('stock')} /></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
