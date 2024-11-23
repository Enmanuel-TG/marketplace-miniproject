import { useNavigate } from 'react-router-dom';
import { type ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
export const ButtonBack = ({ className }: { className: ClassValue }) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        title="Go to Home"
        src="/home.svg"
        onClick={() => {
          navigate('/');
        }}
        alt="Go to Home"
        className={cn('cursor-pointer aspect-square size-10', className)}
      />
    </div>
  );
};
