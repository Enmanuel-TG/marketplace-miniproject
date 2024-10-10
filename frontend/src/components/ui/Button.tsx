interface ButtonProps {
  fieldname: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const Button = ({ fieldname, type, ...props }: ButtonProps) => {

  const style: string = `bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${props.className}`;

  return (
    <div className={style}>
      <button {...props} type={type} onClick={props.onClick}>
        {fieldname}
      </button>
    </div>
  );
};
export default Button;
