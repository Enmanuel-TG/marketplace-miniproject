import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default server;
