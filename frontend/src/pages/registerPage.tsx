import { useAuth } from '../contexts/authContexts';
import InputAccount from '../components/inputAccount';
import InputDataAccount from '../components/inputDataAccount';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPages = () => {

  const { signUp, section, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = () => {
    signUp();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div>{section ? <InputDataAccount /> : <InputAccount />}</div>
      <br />
      <br />
      <div>
        <button onClick={onSubmit}>Click</button>
      </div>
    </div>
  );
};

export default RegisterPages;
