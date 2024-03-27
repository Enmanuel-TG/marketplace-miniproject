import InputAccount from '../components/inputAccount';
import { useAuth } from '../contexts/authContexts';

const LoginPages = () => {
  const { signIn } = useAuth();
  const onSubmit = () => {
    signIn();
  };
  return (
    <div>
      <InputAccount />
      <br/>
      <br />
      <button onClick={onSubmit}>Click</button>
    </div>
  );
};

export default LoginPages;
