import axios from 'axios';
//import { API_URL } from './consts.utility';
export const server = axios.create({
  baseURL:'https://marketplace-miniproject.onrender.com/api',
  withCredentials: true,
});

//'https://marketplace-miniproject.onrender.com/api'
