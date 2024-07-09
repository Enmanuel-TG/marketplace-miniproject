import axios from 'axios';
import { API_URL } from './consts.utility';

export const server = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
