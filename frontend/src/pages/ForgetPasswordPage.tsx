import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { forgetPasswordProps } from '../utilities/interfaces.utility';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgetPasswordPage = () => {
  const { forgetPassword, errors: forgetPasswordErrors } = useAuth();
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const setData = (data: FieldValues) => {
    forgetPassword(data as forgetPasswordProps);
    setState(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const { handleSubmit, register } = useForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded p-8">
        <div className="relative bg-gray-200">
        </div>
        <h2 className="text-4xl text-center font-bold mb-6">Password Reset</h2>
        <p className="text-gray-700 text-base mb-3">
          Please enter the email address associated with your account to reset your password.
        </p>
        <p className="text-gray-700 text-base mb-4">
           You will receive an email with a link to reset your password.
        </p>
        <div>
          {forgetPasswordErrors.map((error, i) => (
            <div key={i} className="text-red-500 mb-2">
              {error}
            </div>
          ))}
          {state ? <div className="text-green-500 mb-2 flex justify-center">Password sent</div> : null}
        </div>
        <form onSubmit={handleSubmit(setData)} className="space-y-4">
          <Input fieldname="Email" type="email" placeholder="Enter your email" {...register('email', { required: true })} />
          <Button fieldname="Send" type="submit" />
        </form>
      </div>
    </div>
  );
};
