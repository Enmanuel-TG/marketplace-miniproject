import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
import { logoutRequest } from '../services/auth.service';

const profilePage = () => {
  const { user, isEdit, setIsEdit, updatePhotoProfile, setIsAuthenticated } = useAuth();
  const logout = async () => {
    await logoutRequest();
    setIsAuthenticated(false);
  };
  return (
    <div>
      <button onClick={logout}>Click</button>
      <div>
        <img src={user?.photo} alt="" width={200} height={200} style={{ borderRadius: '50%' }}/>
        <div style={{ width: '220px', display: 'flex'}}>{isEdit ? <GetPicture /> : <button onClick={() => setIsEdit(true)}>Edit</button>}
          <button onClick={() => updatePhotoProfile() }>Change</button>
        </div>
      </div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <div>{user?.phoneNumber}</div>
      <div>{user?.birthday}</div>
    </div>
  );
};

export default profilePage;

