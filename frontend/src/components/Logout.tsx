import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/Dialog';
import Button from './ui/Button';

const Logout = () => {
  const { user, logOut } = useAuth();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      {user && (
        <DialogTrigger
          className="text-red-500 hover:text-red-700 bg-transparent hover:bg-transparent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Logout
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg flex justify-center">Logout</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base flex justify-center mb-5" >
          Are you sure you want to log out?
        </DialogDescription>
        <Button
          styles='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto'
          fieldname='Logout'
          onClick={() => {
            logOut();
            triggerRef.current?.click();
          }}
        />
        <DialogClose ref={triggerRef}>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
