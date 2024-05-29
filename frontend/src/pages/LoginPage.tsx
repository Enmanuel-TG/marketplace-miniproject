import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Account } from '../utilities/interfaces.utility';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin } = useAuth();
  const { handleSubmit, register } = useForm<Account>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const setData = (data: Account) => {
    console.log('hi');
    signIn(data);
  };
  return (
    <div>
      <h1 className='mb-10 mt-7 text-3xl'>Login</h1>
      <div>
        {errorLogin.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(setData)}>
          <Input fieldname="Email" type="email" {...register('email', { required: true })} />
          <Input fieldname="Password" type="password" {...register('password',
            { required: true })} />
        </form>

      </div>
      <div className='flex justify-between'>
        <div className='flex'>
          <h1 className='mr-3 text-blue-500 '>Do not have account? </h1>
          <button className='h-0' onClick={() => navigate('/register')}>Register</button>
        </div>
        <Button fieldname="Login" type='submit' onClick={handleSubmit(setData)}/>
      </div>
    </div>
  );
};

export default LoginPages;
