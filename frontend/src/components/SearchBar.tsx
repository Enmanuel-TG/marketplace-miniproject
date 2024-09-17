import { FieldValues, useForm } from 'react-hook-form';
import { useProduct } from '../contexts/ProductContext';
import Input from './ui/Input';
import { categoryOptions } from '../utilities/selectOption';

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const { searchProduct, filterCategory } = useProduct();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterCategory(event.target.value);
  };

  const onSubmit = (data: FieldValues) => {
    searchProduct(data.search);
  };

  return (
    <div className="flex justify-center w-full pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 no-select no-drag flex items-center">
        <label className="mb-2 text-sm sr-only text-white">Search</label>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <Input fieldname="" type="search" className="w-full pl-10 text-sm border rounded-lg focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500" placeholder="Search product" {...register('search', { required: true })} />
        </div>
      </form>
      <select id="category" defaultValue="" onChange={handleCategoryChange} className="fl text-sm border rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
        <option value="" disabled>
          Select Filter
        </option>
        <option value="All" >
          All
        </option>
        {categoryOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
