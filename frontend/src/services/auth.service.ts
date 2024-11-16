import { server } from '../utilities/axios.utility';
import { Account, User, ForgetPasswordProps, UpdateUser } from '../utilities/interfaces.utility';

export const registerRequest = async (user: User) => await server.post('/auth/register', user);
export const logoutRequest = async () => await server.post('/auth/logout');
export const loginRequest = async (user: Account) => await server.post('/auth/login', user);
export const profileRequest = async () => await server.get('/user/profile');

export const updatePhotoProfileRequest = async (photo: File) => {
  const formData = new FormData();
  formData.append('photo', photo);
  return await server.post('/user/update', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const forgetPasswordRequest = async (email: ForgetPasswordProps) =>
  await server.post('/recover-account/request-password-reset', email);

export const resetPasswordRequest = async (password: string, token: string) =>
  await server.post(
    '/recover-account/reset-password',
    { newPassword: password },
    {
      headers: {
        authorization: token,
      },
    },
  );

export const loginWithGoogleRequest = async (accessToken: string) => {
  return await server.post(
    '/google-auth/google/login',
    {},
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
};

export const registerWithGoogleRequest = async (accessToken: string, birthday: string) => {
  return await server.post(
    '/google-auth/google/register',
    {
      birthday,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
};

export const updateUserRequest = async (user: UpdateUser) => await server.put('/user/profile', user);

export const getUser = async (id: number) => {
  return await server.post('/user/get-user', { id });
};

export const updateDescription = async (description: string) => {
  return await server.put('/user/description', description);
};

export const getAllUsers = async () => {
  return await server.get('/user/all-users');
};
