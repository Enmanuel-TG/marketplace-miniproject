import { forwardRef } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fieldname?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ fieldname, required, ...props }, ref) => {
  return (
    <label className="flex flex-col px-1">
      <span className="mb-1 cursor-pointer">
        {fieldname}{' '}
        {required && (
          <span className="text-red-500" title={`The ${fieldname} is required.`}>
            *
          </span>
        )}
      </span>
      <input
        required={required}
        ref={ref}
        {...props}
        className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className}`}
      />
    </label>
  );
});
Input.displayName = 'Input';

export default Input;
