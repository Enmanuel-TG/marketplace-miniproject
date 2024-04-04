import { useEffect } from 'react';
import InputAccount from '../components/inputAccount';
import { useAuth } from '../contexts/authContexts';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const onSubmit = () => {
    signIn();
  };
  return (
    <div>
      <InputAccount />
      <br />
      <br />
      <button onClick={onSubmit}>Click</button>
    </div>
  );
};

export default LoginPages;
