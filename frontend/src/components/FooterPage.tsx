import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
const FooterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-screen-md flex items-center justify-between bg-primary text-secondary p-4 gap-4 rounded-md shadow-lg">
          <p className="text-sm md:text-base">For a better experience please login or register first:</p>
          <div className="flex gap-4">
            <Button
              fieldname="Login"
              onClick={() => {
                navigate('/login');
              }}
              styles="text-white text-lg hover:underline px-4"
            />
            <Button
              fieldname="Register"
              onClick={() => {
                navigate('/register');
              }}
              styles="text-white text-lg hover:underline px-3"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FooterPage;
