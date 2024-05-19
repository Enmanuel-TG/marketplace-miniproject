import axios from './axios';
import { Account, User } from '../utility/interfaces';

export const registerRequest = async (user: User) => await axios.post('/auth/register', user);
export const logoutRequest = async () => await axios.post('/auth/logout');
export const loginRequest = async (user: Account) => await axios.post('/auth/login', user);
export const profileRequest = async () => await axios.post('/user/profile');

export const updatePhotoProfileRequest = async (photo:  File) => {
  const formData = new FormData();
  formData.append('photo', photo);

  return await axios.post('/user/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
