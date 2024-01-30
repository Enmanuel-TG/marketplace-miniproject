import { Request, Response } from 'express';
import { register } from '../handlers/register.ts';
import { login } from '../handlers/login.ts';

const UserController = {
  async registerUser(req: Request, res: Response) {
    try {
      await register(req, res);
    } catch (error) {
      res.status(500).json({
        message: 'error to register user',
        error: error || 'unknown error',
      });
    }
  },
  async loginUser(req: Request, res: Response) {
    try {
      await login(req, res);
    } catch (error) {
      res.status(500).json({
        message: 'error to login user',
        error: error || 'unknown error',
      });
    }
  },
};

export default UserController;
