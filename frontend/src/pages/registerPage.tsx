import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/authContexts';

const RegisterPages = () => {
  const { signUp } = useAuth();
  const { handleSubmit, register } = useForm();
  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" {...register('username', { required: true })} placeholder="UserName" />
      </div>
      <div>
        <input type="email" {...register('email', { required: true })} placeholder="Email" />
      </div>
      <div>
        <input type="password" {...register('password', { required: true })} placeholder="Password" />
      </div>
      <div>
        <input type="date" {...register('birthday', { required: true })} placeholder="birthday" />
      </div>
      <div>
        <input type="tel" {...register('numberPhone', { required: true })} placeholder="Number Phone" />
      </div>
      <div>
        <button type="submit">Click</button>
      </div>
    </form>
  );
};

export default RegisterPages;
