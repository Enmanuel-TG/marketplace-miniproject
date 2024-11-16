import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
const FooterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="">
      {!isAuthenticated && (
        <div className="w-2/3 mb-3 py-3 rounded-md bg-primary text-secondary fixed flex align-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 ">
          <p className="mr-4 text-lg ">For a better experience please login or register first:</p>
          <div className="flex gap-4">
            <Button
              fieldname="Login"
              onClick={() => {
                navigate('/login');
              }}
              styles="text-white text-lg hover:underline no-select no-drag px-4"
            />
            <Button
              fieldname="Register"
              onClick={() => {
                navigate('/register');
              }}
              styles="text-white text-lg hover:underline no-select no-drag px-3"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterPage;
