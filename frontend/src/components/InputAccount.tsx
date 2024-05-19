import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Account } from '../utilities/interfaces.utility';

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
        <div>
          <input type="email" {...register('email', { required: true })} placeholder="Email" />
        </div>
        <div>
          <input type="password" {...register('password', { required: true })} placeholder="Password" />
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default InputAccount;
