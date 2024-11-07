import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import HeadPage from '@/components/HeadPage';

export const ResetPasswordPage = () => {
  const {
    resetPassword,
    errors: resetPasswordErrors,
    isResetPasswordEmailSent: state,
    setIsResetPasswordEmailSent: setState,
  } = useAuth();
  const { handleSubmit, register } = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    resetPassword(data.password, data['confirm-password'], token as string);
  };

  useEffect(() => {
    setState(false);
  }, []);

  function back() {
    setState(false);
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    state && toast.success('Password changed successfully', toastifyConfig);
  }, [state]);

  useEffect(() => {
    if (resetPasswordErrors.length > 0) {
      resetPasswordErrors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [resetPasswordErrors]);

  return (
    <>
      <HeadPage namePage="Reset Password" />
      <div className="flex m-28 justify-center min-h-screen">
        <div className="w-full max-w-lg mx-auto p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input fieldname="New password" type="password" {...register('password', { required: true })} />
            <br />
            <Input fieldname="Confirm Password" type="password" {...register('confirm-password', { required: true })} />
            <br />
          </form>
          {state ? (
            <Button
              fieldname="Back"
              onClick={() => {
                back();
              }}
            />
          ) : (
            <Button fieldname="Save" type="submit" onClick={handleSubmit(onSubmit)} />
          )}
        </div>
      </div>
    </>
  );
};
