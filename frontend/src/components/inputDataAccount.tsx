import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/authContexts';
import { DataAccount } from '../utility/interfaces';

const InputDataAccount = () => {
  const { setDataAccount, signUp,  setSection } = useAuth();
  const { handleSubmit, register } = useForm<DataAccount>();
  const onSubmit = (data: DataAccount) => {
    setDataAccount(data);
    signUp();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" {...register('name', { required: true })} placeholder="Name" />
        </div>
        <div>
          <input type="text" {...register('last_name', { required: true })} placeholder="Last Name" />
        </div>
        <div>
          <input type="date" {...register('birthday', { required: true })} placeholder="birthday" />
        </div>
        <div>
          <input type="tel" {...register('phoneNumber', { required: true })} placeholder="Number Phone" />
        </div>
        <div>
          <button onClick={() => { setSection(false); }}>back</button>
          <button type="submit">Click</button>
        </div>
      </form>
    </div>
  );
};

export default InputDataAccount;
