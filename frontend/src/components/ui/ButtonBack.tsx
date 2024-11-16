import { useNavigate } from 'react-router-dom';
import { type ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
export const ButtonBack = ({ className }: { className: ClassValue }) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src="/home.svg"
        onClick={() => {
          navigate('/');
        }}
        alt="Back"
        className={cn('cursor-pointer w-10 h-10', className)}
      />
    </div>
  );
};
