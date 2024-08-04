import { useAuth } from '../contexts/AuthContext';
const MyIconProfile = ({className}: {className: string}) => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div>{isAuthenticated && <img className={className} src={user?.photo}/>}</div>
  );
};
export default MyIconProfile;