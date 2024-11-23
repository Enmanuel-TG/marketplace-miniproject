import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Account } from '../utilities/interfaces.utility';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import HeadPage from '@/components/HeadPage';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin, loginWithGoogle, setErrors } = useAuth();
  const { handleSubmit, register } = useForm<Account>();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setErrors([]);
      isFirstRender.current = false;
      return;
    }
    if (errorLogin.length > 0) {
      errorLogin.map((error) => toast.error(error, toastifyConfig));
    }
  }, [errorLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const setData = (data: Account) => {
    signIn(data);
  };

  return (
    <div>
      <HeadPage namePage="Login" />
      <div className="m-auto">
        <div className="w-full max-w-md mx-auto my-28">
          <form onSubmit={handleSubmit(setData)} className="space-y-6">
            <Input
              className="mb-3"
              fieldname="Email"
              type="email"
              required
              {...register('email', { required: true })}
            />
            <Input required fieldname="Password" type="password" {...register('password', { required: true })} />
            <div className="flex justify-between items-center">
              <Link className="text-blue-500 hover:text-blue-700 text-sm hover:underline" to="/forget-password">
                Forgot password?
              </Link>
            </div>
            <Button fieldname="Sign In" type="submit" styles="px-4 py-2 w-full" />
          </form>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="my-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={loginWithGoogle}
            >
              Sign in with Google 🚀
            </button>
          </div>
          <div className="flex items-center">
            <span>New to our platform? </span>
            <Link className="text-blue-500 hover:text-blue-700 ml-2" to="/register">
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
