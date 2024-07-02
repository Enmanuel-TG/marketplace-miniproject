import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Account } from '../utilities/interfaces.utility';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin, login } = useAuth();
  const { handleSubmit, register } = useForm<Account>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  const setData = (data: Account) => {
    signIn(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <div>
          {errorLogin.map((error, i) => (
            <div key={i} className="text-red-500 mb-2">{error}</div>
          ))}
        </div>
        <div>
          <form onSubmit={handleSubmit(setData)}>
            <Input fieldname="Email" type="email" {...register('email', { required: true })}/>
            <Input fieldname="Password" type="password" {...register('password',
              { required: true })}
            />
            <div  className="flex justify-end" >
              <button className="text-blue-500 hover:text-blue-700 text-sm hover:underline" onClick={() => {navigate('/ForgetPassword');}}>
      Forget Password?
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className='w-3/4'>
                <span className="mr-2">Do not have an account?</span>
                <button type="button" className="text-blue-500 hover:text-blue-700 font-bold"
                  onClick={() => navigate('/register')}>
                  Register
                </button>
              </div>
              <Button fieldname="Login" type="submit" />
            </div>
          </form>
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={login}>Sign in with Google 🚀</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
