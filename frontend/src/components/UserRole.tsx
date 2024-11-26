import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/Dialog';
import Button from './ui/Button';
import { toastifyConfig } from '@/utilities/toastify.utility';
import { toast } from 'react-toastify';
import { updateRoleRequest } from '@/services/role.service';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Profile } from '@/utilities/interfaces.utility';

const UserRole = (user: { name: string; role: string; photo: string; id: number }) => {
  const { userData, setUserData, user: loggedUser } = useAuth();
  const changeRole = async (id: number, role: string) => {
    try {
      const res = await updateRoleRequest(id, role);
      if (res.status === 200) {
        setUserData({ ...userData, role } as Profile);
        toast.success(res.data.message, toastifyConfig);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message, toastifyConfig);
        }
      }
    }
  };
  return (
    <div className="flex mx-4 md:w-2/3 pt-3 md:mx-auto">
      <div className="flex flex-row w-full justify-between bg-gray-100 shadow p-2">
        <div className="flex flex-row items-center gap-2">
          <img className="aspect-square size-10 rounded-full" src={user.photo} alt="Profile" />
          <p>{user.name}</p>
        </div>
        <Dialog>
          <DialogTrigger title={user?.id === loggedUser?.id ? 'You can not change your own role' : 'Change role'}>
            <Button fieldname="Role" styles="py-2 px-4" disabled={user?.id === loggedUser?.id} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Roles</DialogTitle>
              <div className="flex flex-col m-auto">
                <p>This is the role of {user.name}</p>
                <p className="font-bold mx-auto">{user.role}</p>
              </div>
            </DialogHeader>
            <DialogClose>
              <div>
                {user.role === 'admin' ? (
                  <div className="flex justify-center">
                    <Button
                      fieldname="Change to User"
                      onClick={() => changeRole(user.id, 'user')}
                      styles="  py-2 px-4"
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
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserRole;
