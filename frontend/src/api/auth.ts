import axios from './axios';
import { Account, User } from '../utility/interfaces';

export const registerRequest = async (user: User) => await axios.post('/auth/register', user);
export const LoginRequest = async (user: Account) => await axios.post('/auth/login', user);
