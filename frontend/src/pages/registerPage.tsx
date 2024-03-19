import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/authContexts';
import { User } from '../utility/interfaces';

const RegisterPages = () => {
  const { setUser, signUp } = useAuth();
  const { handleSubmit, register } = useForm<User>();
  const onSubmit = (data: User) => {
    setUser(data);
    signUp(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" {...register('name', { required: true })} placeholder="UserName" />
      </div>
      <div>
        <input type="email" {...register('email', { required: true })} placeholder="Email" />
      </div>
      <div>
        <input type="password" {...register('password', { required: true })} placeholder="Password" />
      </div>
      <div>
        <input type="text" {...register('birthday', { required: true })} placeholder="birthday" />
      </div>
      <div>
        <input type="tel" {...register('phoneNumber', { required: true })} placeholder="Number Phone" />
      </div>
      <div>
        <button type="submit">Click</button>
      </div>
    </form>
  );
};

export default RegisterPages;
