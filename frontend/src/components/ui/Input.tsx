import { forwardRef } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fieldname: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ fieldname, ...props }, ref) => {
  return (
    <label className="flex flex-col mt-3 ">
      <span>{fieldname}</span>
      <input ref={ref} {...props} className="border-solid  border-2 border-black  rounded-md h-10 " />
    </label>
  );
});
Input.displayName = 'Input';

export default Input;
