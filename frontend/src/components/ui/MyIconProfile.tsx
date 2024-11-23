import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const MyIconProfile = ({ className }: { className: string }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {isAuthenticated && (
        <img
          className={className}
          src={user?.photo}
        />
      )}
    </div>
  );
};
export default MyIconProfile;
