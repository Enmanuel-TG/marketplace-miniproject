import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';


export const ResetPasswordPage = () => {
  const { resetPassword, errors: resetPasswordErrors, state, setState } = useAuth();
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
    console.log('Hi');
    navigate('/login', { replace: true });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded p-8">
        <h2 className="text-4xl text-center font-bold mb-6">Password Reset</h2>
        {resetPasswordErrors.map((error, i) => (
          <div key={i} className="text-red-500 mb-2 flex justify-center">
            {error}
          </div>
        ))}
        {state ? <div className="text-green-500 mb-2 flex justify-center">
            Your password has been successfully reset.
        </div> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input fieldname="New password" type="password" {...register('password', { required: true })} />
          <Input fieldname="Confirm Password" type="password" {...register('confirm-password', { required: true })} />
        </form>
        {state ? <Button fieldname="Back" onClick={() => { back();} }/> :  <Button fieldname="Save" type="submit" onClick={handleSubmit(onSubmit)} />}
      </div>
    </div>
  );
};
