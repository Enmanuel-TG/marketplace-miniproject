import { useNavigate } from 'react-router-dom';
export const ButtonBack = ({styles} : {styles: string}) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src="/arrowBack.svg"
        onClick={() => {
          navigate('/');
        }}
        alt="Back"
        className={`cursor-pointer w-10 h-10 ${styles}`}
      />
    </div>
  );
};
