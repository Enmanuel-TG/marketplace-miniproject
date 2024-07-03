import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { forgetPasswordProps } from '../utilities/interfaces.utility';

export const ForgetPasswordPage = () => {
  const { forgetPassword } = useAuth();
  const setData = (data: FieldValues) => {
    forgetPassword(data as forgetPasswordProps);
    console.log(data);
  };

  const { handleSubmit, register } = useForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <form onSubmit={handleSubmit(setData)} className="w-full max-w-md mx-auto">
        <Input fieldname="Email" type="email" {...register('email', { required: true })} />
        <Button fieldname="Send" type="submit" />
      </form>
    </div>
  );
};
