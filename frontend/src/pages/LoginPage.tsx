import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { Account } from '../utilities/interfaces.utility';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import axios from 'axios';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin } = useAuth();
  const { handleSubmit, register } = useForm<Account>();
  const [user, setUser] = useState<TokenResponse | null>(null);
  const [ profile, setProfile ] = useState([]);
  console.log(user, profile);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setUser(codeResponse), console.log(codeResponse);},
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  useEffect(
    () => {
      if (user) {
        console.log(user);
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [ user ],
  );
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
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => login}>Sign in with Google 🚀 </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
