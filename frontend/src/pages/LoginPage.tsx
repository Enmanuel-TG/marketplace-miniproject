import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Account } from '../utilities/interfaces.utility';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin, loginWithGoogle } = useAuth();
  const { handleSubmit, register } = useForm<Account>();

  useEffect(() => {
    errorLogin.map((error) => toast.error(error, toastifyConfig));
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Login</h1>
        <div>
          <form onSubmit={handleSubmit(setData)}>
            <Input fieldname="Email" type="email" {...register('email', { required: true })} />
            <Input fieldname="Password" type="password" {...register('password', { required: true })} />
            <div className="flex justify-end">
              <Link className="text-blue-500 hover:text-blue-700 text-sm hover:underline" to="/forget-password">
                Forget Password?
              </Link>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="w-3/4">
                <span className="mr-2 text-white">Do not have an account?</span>
                <Link type="button" className="text-blue-500 hover:text-blue-700 font-bold" to="/register">
                  Register
                </Link>
              </div>
              <Button fieldname="Login" type="submit" />
            </div>
          </form>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={loginWithGoogle}
          >
            Login with Google 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
