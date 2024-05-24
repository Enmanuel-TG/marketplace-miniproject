import axios from 'axios';
import { API_URL } from './consts.utility';

const server = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
export default server;
