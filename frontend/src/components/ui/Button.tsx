interface ButtonProps {
  fieldname: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const Button = ({ fieldname, type, ...props }: ButtonProps) => {
  const style: string = `bg-blue-500 hover:bg-blue-700  text-white font-bold rounded focus:outline-none focus:shadow-outline ${props.className}`;

  return (
    <button className={style} {...props} type={type} onClick={props.onClick}>
      {fieldname}
    </button>
  );
};
export default Button;
