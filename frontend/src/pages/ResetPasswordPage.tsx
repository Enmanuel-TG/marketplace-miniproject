import { useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';

export const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const { handleSubmit, register } = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const onSubmit = (data: FieldValues) => {
    resetPassword(data.password, data['confirm-password'], token as string);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input fieldname="Password" type="password" {...register('password', { required: true })} />
          <Input fieldname="Confirm Password" type="password" {...register('confirm-password', { required: true })} />
        </form>
        <Button fieldname="Save" type="submit" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};
