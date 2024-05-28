import { forwardRef } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fieldname: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ fieldname, ...props }, ref) => {
  return (
    <label className="">
      <span className="">{fieldname}</span>
      <input ref={ref} {...props} className="" />
    </label>
  );
});

Input.displayName = 'Input';

export default Input;
