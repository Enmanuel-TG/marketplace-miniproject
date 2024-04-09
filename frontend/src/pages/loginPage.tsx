import { useEffect } from 'react';
import InputAccount from '../components/inputAccount';
import { useAuth } from '../contexts/authContexts';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, errors: errorLogin} = useAuth();

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
      <div>
        {errorLogin.map((error,  i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <InputAccount />
      <br />
      <br />
      <button onClick={onSubmit}>Click</button>
    </div>
  );
};

export default LoginPages;
