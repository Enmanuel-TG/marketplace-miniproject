import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
const FooterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {!isAuthenticated && (
        <div className="flex m-4 flex-row items-center justify-center fixed bottom-0 w-full">
          <p className="mr-4 text-lg text-white">For a better experience please login or register first:</p>
          <div className="flex gap-4">
            <Button
              fieldname="Login"
              onClick={() => {
                navigate('/login');
              }}
              styles="text-white hover:text-blue-700 text-lg hover:underline no-select no-drag"
            />
            <Button
              fieldname="Register"
              onClick={() => {
                navigate('/register');
              }}
              styles="text-white hover:text-blue-700 text-lg hover:underline no-select no-drag"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FooterPage;
