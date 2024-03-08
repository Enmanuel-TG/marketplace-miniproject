import axios from './axios';

interface user {
  name: string;
  email: string;
  password: string;
  birthday: string;
  phoneNumber: string;
}

export const registerRequest = async (user: user) => await axios.post('/register', user);
