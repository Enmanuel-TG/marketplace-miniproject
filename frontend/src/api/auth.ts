import axios from './axios';
import { Account, User } from '../utility/interfaces';

export const registerRequest = async (user: User) => await axios.post('/auth/register', user);
export const loginRequest = async (user: Account) => await axios.post('/auth/login', user);
export const profileRequest = async () => await axios.post('/user/profile');