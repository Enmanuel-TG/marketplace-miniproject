import { forwardRef } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fieldname: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ fieldname, ...props }, ref) => {
  return (
    <label className="flex flex-col px-1">
      <span className="text-white" >{fieldname}</span>
      <input
        ref={ref}
        {...props}
        className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className}`}
      />
    </label>
  );
});
Input.displayName = 'Input';

export default Input;
