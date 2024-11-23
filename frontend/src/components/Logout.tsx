import { logoutRequest } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { toastifyConfig } from '@/utilities/toastify.utility';
import Button from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';

const Logout = () => {
  const { user, logOut } = useAuth();

  return (
    <Dialog>
      {user && (
        <DialogTrigger>
          <Button
            styles="text-red-500 hover:text-red-700 bg-transparent hover:bg-transparent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            fieldname="Logout"
          />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg flex justify-center">Are you sure you want to log out?</DialogTitle>
        </DialogHeader>
        <DialogClose>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={logOut}
          >
            Logout
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
