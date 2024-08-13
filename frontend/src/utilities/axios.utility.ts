import axios from 'axios';

export const server = axios.create({
  baseURL:'https://marketplace-miniproject.onrender.com/api',
  withCredentials: true,
});

//'https://marketplace-miniproject.onrender.com/api'
