import { useAuth } from '../contexts/authContexts';
import InputAccount from '../components/inputAccount';
import InputDataAccount from '../components/inputDataAccount';

const RegisterPages = () => {
  const { signUp, section } = useAuth();
  const onSubmit = () => {
    signUp();
  };
  return (
    <div>
      <div>
        {section ? <InputDataAccount/> : <InputAccount />}
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>
        <button onClick={onSubmit}>Click</button>
      </div>
    </div>
  );
};

export default RegisterPages;
