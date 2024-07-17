import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { ForgetPasswordProps } from '../utilities/interfaces.utility';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';

export const ForgetPasswordPage = () => {
  const { forgetPassword, errors: forgetPasswordErrors, state, setState } = useAuth();
  const setData = (data: FieldValues) => {
    forgetPassword(data as ForgetPasswordProps);
  };
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  function back() {
    navigate('/login', { replace: true });
  }
  useEffect(() => {
    setState(false);
  }, []);

  useEffect(() => {
    state && toast.success('Send email successfully', toastifyConfig);
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded p-8">
        <button onClick={back}>Back</button>
        <h2 className="text-4xl text-center font-bold mb-6">Password Reset</h2>
        <p className="text-gray-700 text-base mb-3">
          Please enter the email address associated with your account to reset your password.
        </p>
        <p className="text-gray-700 text-base mb-4">You will receive an email with a link to reset your password.</p>
        <div>
          {forgetPasswordErrors.map((error, i) => (
            <div key={i} className="text-red-500 mb-2">
              {error}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(setData)} className="space-y-4">
          <Input
            fieldname="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
          />
          {state || <Button fieldname="Send" type="submit" />}
        </form>
      </div>
    </div>
  );
};
