import { useAuth } from '../contexts/AuthContext';
import InputAccount from '../components/InputAccount';
import InputDataAccount from '../components/InputDataAccount';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPages = () => {

  const {section, isAuthenticated, errors: errorRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div>
        {errorRegister.map((error,  i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <div>{section ? <InputDataAccount /> : <InputAccount />}</div>
    </div>
  );
};

export default RegisterPages;
