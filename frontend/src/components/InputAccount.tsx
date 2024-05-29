import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Account } from '../utilities/interfaces.utility';
import Input from './ui/Input';
import Button from './ui/Button';

const InputAccount = () => {
  const { setSection, setAccount } = useAuth();
  const { handleSubmit, register } = useForm<Account>();
  const onSubmit = (data: Account) => {
    setSection(true);
    setAccount(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input fieldname="Email" type="email" {...register('email', { required: true })} />
        <Input fieldname="Password" type="password" {...register('password', { required: true })} />
        <Button fieldname="Login" onClick={() => {onSubmit;}}/>
      </form>
    </div>
  );
};

export default InputAccount;
