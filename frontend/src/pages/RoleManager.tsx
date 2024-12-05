import { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/auth.service';
import UserRole from '@/components/UserRole';
import { toast } from 'react-toastify';
import { toastifyConfig } from '@/utilities/toastify.utility';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeadPage from '@/components/HeadPage';
import Input from '@/components/ui/Input';

interface Users {
  id: number;
  name: string;
  photo: string;
  role: string;
  email: string;
}

const RoleManager = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<Users[]>([]);
  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message, toastifyConfig);
        }
      }
    }
  };
  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('You are not an admin', toastifyConfig);
      navigate('/', { replace: true });
      return;
    }
    getUsers();
  }, []);

  return (
    <div>
      <HeadPage namePage="Role Manager" />
      <div className="mx-4 md:w-2/3 pt-3 md:mx-auto py-8">
        <Input
          type="search"
          className="pl-10 text-sm text-primary border rounded-lg focus:border-blue-500 bg-muted focus:ring-blue-500"
          placeholder="Search Users by email"
          onChange={(e) => {
            const search = e.target.value.toLowerCase();
            if (search.trim() === '') {
              getUsers();
            } else {
              const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(search));
              setUsers(filteredUsers);
            }
          }}
        />
      </div>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <UserRole name={user.name} role={user.role} photo={user.photo} id={user.id} email={user.email} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleManager;
