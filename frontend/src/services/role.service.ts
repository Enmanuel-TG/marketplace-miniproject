import { User } from '@/utilities/interfaces.utility';
import { server } from '../utilities/axios.utility';

export interface UpdateRoleResponse {
  message: string;
  user: User;
}

export const updateRoleRequest = async (id: number, role: string) => {
  return await server.put('/roles/change', { role, id });
};
