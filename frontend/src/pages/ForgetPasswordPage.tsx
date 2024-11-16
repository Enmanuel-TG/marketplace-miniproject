import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { ForgetPasswordProps } from '../utilities/interfaces.utility';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import HeadPage from '@/components/HeadPage';

export const ForgetPasswordPage = () => {
  const {
    forgetPassword,
    errors: forgetPasswordErrors,
    isResetPasswordEmailSent: state,
    setIsResetPasswordEmailSent: setState,
  } = useAuth();
  const setData = (data: FieldValues) => {
    forgetPassword(data as ForgetPasswordProps);
  };
  const { handleSubmit, register } = useForm();
  useEffect(() => {
    setState(false);
  }, []);

  useEffect(() => {
    state && toast.success('Send email successfully', toastifyConfig);
  }, [state]);

  return (
    <>
      <HeadPage namePage="Forget Password Page" />
      <div className="flex my-28 justify-center min-h-screen">
        <div className="w-full max-w-lg mx-auto p-8">
          <p className="text-base mb-3">
            Please enter the email address associated with your account to reset your password.
          </p>
          <p className="  text-base mb-4">You will receive an email with a link to reset your password.</p>
          <br />
          <br />
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
            {state || <Button fieldname="Send" styles="px-3 py-2" type="submit" />}
          </form>
        </div>
      </div>
    </>
  );
};
