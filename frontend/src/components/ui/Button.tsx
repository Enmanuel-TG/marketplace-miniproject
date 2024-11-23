import { cn } from '@/lib/utils';

interface ButtonProps {
  fieldname: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  styles?: string;
}

const Button = ({ fieldname, type, disabled, ...props }: ButtonProps) => {
  const style = cn(
    'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline',
    disabled ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : 'hover:bg-blue-700',
    props.styles,
  );

  return (
    <button className={style} type={type} onClick={props.onClick} disabled={disabled} {...props}>
      {fieldname}
    </button>
  );
};

export default Button;
