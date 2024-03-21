import axios from './axios';
import { User } from '../utility/interfaces';

export const registerRequest = async (user: User) => await axios.post('/auth/register', user);
