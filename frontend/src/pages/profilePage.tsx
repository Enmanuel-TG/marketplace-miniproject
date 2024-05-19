import { useAuth } from '../contexts/authContexts';
import GetPicture from '../components/getPicture';
const profilePage = () => {
  const { user, isEdit, setIsEdit, updatePhotoProfile } = useAuth();
  return (
    <div>
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

