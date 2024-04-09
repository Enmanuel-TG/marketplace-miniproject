import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>AuthPage</div>
      <div>
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default AuthPage;