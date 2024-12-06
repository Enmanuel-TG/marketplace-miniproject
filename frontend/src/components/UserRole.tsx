import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/Dialog';
import Button from './ui/Button';
import { toastifyConfig } from '@/utilities/toastify.utility';
import { toast } from 'react-toastify';
import { updateRoleRequest } from '@/services/role.service';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Profile } from '@/utilities/interfaces.utility';
import { useRef } from 'react';

const UserRole = (user: { name: string; role: string; photo: string; id: number, email: string }) => {
  const { userData, setUserData, user: loggedUser } = useAuth();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const changeRole = async (id: number, role: string) => {
    try {
      const res = await updateRoleRequest(id, role);
      if (res.status === 200) {
        setUserData({ ...userData, role } as Profile);
        toast.success(res.data.message, toastifyConfig);
        triggerRef.current?.click();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.message, toastifyConfig);
      }
    }
  };

  return (
    <div className="mx-4 lg:mx-8 md:w-10/12 pt-3 md:mx-auto">
      <div className="flex flex-wrap items-center justify-between md:flex-row bg-gray-100 shadow p-2 w-full">
        <div className="flex items-center gap-2 w-[300px] min-w-[250px]">
          <img
            className="aspect-square size-10 rounded-full"
            src={user.photo}
            alt="Profile"
          />
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <p>{user.name}</p>
              <p className="capitalize text-sm text-gray-500">{user.role}</p>
            </div>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <div>
          <Dialog>
            {user?.id !== loggedUser?.id ? (
              <DialogTrigger
                className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline py-2 px-4 text-sm md:text-base mt-2 md:mt-0"
                title={
                  user?.id === loggedUser?.id
                    ? 'You cannot change your own role'
                    : 'Change role'
                }
              >
              Change role
              </DialogTrigger>
            ) : (
              <div className="py-2 px-4 text-lg font-medium">You</div>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg flex justify-center">Roles</DialogTitle>
              </DialogHeader>
              <DialogDescription className=" flex flex-col mx-auto mb-5">
              Are you sure you want to change the role of {user.name}?
                <strong className="font-bold flex justify-center">{user.role}</strong>
              </DialogDescription>
              <div>
                {user.role === 'admin' ? (
                  <div className="flex justify-center">
                    <Button
                      fieldname="Change to User"
                      onClick={() => changeRole(user.id, 'user')}
                      styles="py-2 px-4"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      fieldname="Change to Admin"
                      onClick={() => changeRole(user.id, 'admin')}
                      styles="py-2 px-4"
                    />
                  </div>
                )}
              </div>
              <DialogClose ref={triggerRef} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
