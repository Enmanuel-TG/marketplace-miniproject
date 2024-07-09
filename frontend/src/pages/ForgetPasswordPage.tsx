import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { forgetPasswordProps } from '../utilities/interfaces.utility';

export const ForgetPasswordPage = () => {
  const { forgetPassword } = useAuth();
  const setData = (data: FieldValues) => {
    forgetPassword(data as forgetPasswordProps);
  };

  const { handleSubmit, register } = useForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded p-8">
        <h2 className="text-4xl text-center font-bold mb-6">Password Reset</h2>
        
        <p className="text-gray-700 text-base mb-4">
          Please enter the email address associated with your account to reset your password.
        </p>
        <p className="text-gray-700 text-base mb-4">
           You will receive an email with a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(setData)} className="space-y-4">
          <Input fieldname="Email" type="email" placeholder="Enter your email" {...register('email', { required: true })} />
          <Button fieldname="Send" type="submit" />

          {/* Opcional: Mensaje de error si el campo de correo electrónico es requerido */}
          {/* {errors.email && <span>This field is required</span>} */}
        </form>
      </div>
    </div>
  );
};
