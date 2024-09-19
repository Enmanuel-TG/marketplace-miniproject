import { useAuth } from '../contexts/AuthContext';
import GetPicture from '../components/GetPicture';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProfilePage = () => {
  const { user, setIsEdit, errors } = useAuth();

  useEffect(() => {
    errors.map((error) => toast.error(error, toastifyConfig));
  }, [errors]);

  return (
    <Dialog>
      <div className="bg-gray-900 mt-10 flex w-2/3 mx-auto h-screen no-drag no-select">
        <div className="flex items-center ml-20 p-10 gap-8">
          <div>
            <img src={user?.photo} className="w-48 h-48 no-select no-drag rounded-full shadow-lg" />
            <DialogTrigger
              className="relative bottom-7 left-36 px-3 py-1 no-select no-drag bg-blue-500 text-white rounded-lg"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </DialogTrigger>
          </div>
          <div>
            <p className="text-white text-2xl font-semibold">{user?.name}</p>
            {user?.createdAt && (
              <div className="text-white">
                Joined on{' '}
                {new Date(user?.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your photo profile</DialogTitle>
        </DialogHeader>
        <img src={user?.photo} className="w-48 h-48 no-select no-drag rounded-full shadow-lg" />
        <GetPicture />
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePage;
