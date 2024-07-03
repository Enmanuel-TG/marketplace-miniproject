import { useSearchParams } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return <div>ResetPassword {token}</div>;
};
