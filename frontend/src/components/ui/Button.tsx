interface ButtonProps {
  fieldname: string;
  onClick?: () => void;
  type?: 'button' | 'submit'  ;
}
const Button = ({fieldname, type, ...props}: ButtonProps) => {
  return (
    <div className="mt-4">
      <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props} type={type} onClick={props.onClick}>{fieldname}</button>
    </div>
  );
};
export default Button;
