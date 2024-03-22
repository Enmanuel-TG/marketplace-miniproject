import { useAuth } from '../contexts/authContexts';
import InputAccount from '../components/inputAccount';
import InputDataAccount from '../components/inputDataAccount';

const RegisterPages = () => {
  const { signUp } = useAuth();
  const onSubmit = () => {
    signUp();
  };
  return (
    <div>
      <div>
        <button onClick={onSubmit}>Click</button>
      </div>
      <br/>
      <br/>
      <br/>
      <InputAccount />
      <br/>
      <br/>
      <br />
      <InputDataAccount/>
    </div>
  );
};

export default RegisterPages;
