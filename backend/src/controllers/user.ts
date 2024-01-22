import { Request, Response } from 'express';
import { register } from '../handlers/register.ts';

const UserController = {
  async registerUser(req: Request, res: Response) {
    try {
      await register(req, res);
    } catch (error) {
      res.status(500).json({
        message: 'Error en el registro del usuario',
        error: error || 'Error desconocido',
      });
    }
  },
};

export default UserController;
