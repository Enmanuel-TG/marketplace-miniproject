import { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/auth.service';

interface Users {
  id: number;
  name: string;
  photo: string;
  role: string;
}


const RoleManager = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const getUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  return <div>RoleManager</div>;
};

export default RoleManager;
