import axios from 'axios';
import { API_URL } from './consts.utility';

export const server = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const googleServer = axios.create({
  baseURL: 'https://www.googleapis.com/oauth2/v1',
});


