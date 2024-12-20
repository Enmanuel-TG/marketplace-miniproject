import { FieldValues, useForm } from 'react-hook-form';
import { useProduct } from '../contexts/ProductContext';
import Input from './ui/Input';
import { categoryOptions } from '../utilities/select-option.utility';

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const { searchProduct, filterCategory } = useProduct();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterCategory(event.target.value);
  };

  const onSubmit = (data: FieldValues) => {
    searchProduct(data.search);
  };

  const getAllProducts = (data: string) => {
    if (data === '') {
      filterCategory('All');
    }
  };

  return (
    <div className="w-10/12 mx-auto  flex flex-col sm:flex-row items-center gap-3 pt-5 px-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            type="search"
            className="w-full pl-10 py-3 text-sm text-primary border rounded-lg focus:border-blue-500 bg-muted focus:ring-blue-500"
            placeholder="Search product by Name or Location"
            {...register('search', { required: true, onChange: (e) => getAllProducts(e.target.value) })}
          />
        </div>
      </form>
      <select
        id="category"
        defaultValue=""
        onChange={handleCategoryChange}
        className="w-full sm:w-auto px-3 py-3 text-sm border rounded-lg bg-muted text-primary focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select Filter
        </option>
        <option value="All">All</option>
        {categoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
