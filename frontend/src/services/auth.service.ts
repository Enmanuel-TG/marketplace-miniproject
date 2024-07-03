import { server, googleServer } from '../utilities/axios.utility';
import { Account, User, forgetPasswordProps } from '../utilities/interfaces.utility';

export const registerRequest = async (user: User) => await server.post('/auth/register', user);
export const logoutRequest = async () => await server.post('/auth/logout');
export const loginRequest = async (user: Account) => await server.post('/auth/login', user);
export const profileRequest = async () => await server.get('/user/profile');

export const updatePhotoProfileRequest = async (photo: File) => {
  const formData = new FormData();
  formData.append('photo', photo);
  return await server.post('/user/update', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const authWithGoogle = async (accessToken: string) => {
  const response = await googleServer.get(`/userinfo?access_token=${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const forgetPasswordRequest = async (email: forgetPasswordProps) =>
  await server.post('/user/request-password-reset', email);
