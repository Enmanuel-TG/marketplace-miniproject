import { useAuth } from '../contexts/authContexts';
import InputAccount from '../components/inputAccount';
import InputDataAccount from '../components/inputDataAccount';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPages = () => {

  const {section, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div>{section ? <InputDataAccount /> : <InputAccount />}</div>
    </div>
  );
};

export default RegisterPages;
