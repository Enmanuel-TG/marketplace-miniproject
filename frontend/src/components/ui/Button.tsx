import { cn } from '@/lib/utils';

interface ButtonProps {
  fieldname: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  styles?: string;
}

const Button = ({ fieldname, type, ...props }: ButtonProps) => {
  const style = cn(
    'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline focus:shadow-outline',
    props.styles,
  );

  return (
    <button className={style} {...props} type={type} onClick={props.onClick}>
      {fieldname}
    </button>
  );
};
export default Button;
