import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
import { logoutRequest } from '../services/auth.service';

const ProfilePage = () => {
  const { user, isEdit, setIsEdit, setIsAuthenticated } = useAuth();

  const logout = async () => {
    await logoutRequest();
    setIsAuthenticated(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg mb-4">
        Logout
      </button>
      <div className="flex flex-col items-center">
        <img src={user?.photo} className="w-48 h-48 rounded-full shadow-lg" />
        <div className=''>
          {isEdit ? <GetPicture /> :
            <button onClick={() => setIsEdit(true)} className="relative bottom-7 left-16 px-3 py-1 bg-blue-500 text-white rounded-lg">
            Edit</button>
          }</div>
      </div>
      <div className="space-y-4 text-center">
        <div className="text-white text-2xl font-semibold">{user?.name}</div>
        <div className="text-white">{user?.email}</div>
        <div className="text-white">{user?.phoneNumber}</div>
        {
          user?.createdAt &&
            <div className="text-white">
              Joined on {new Date(user?.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </div>
        }

      </div>
      <div className="mt-8 text-center">
        <h2 className="text-white text-xl font-semibold mb-2">Rating</h2>
        <div className="flex justify-center items-center">
          {[...Array(4)].map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <svg
            className="w-6 h-6 ms-1 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;