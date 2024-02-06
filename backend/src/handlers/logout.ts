import { Request, Response } from 'express';

export const logout = (_req: Request, res: Response) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0),
    });
    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    return res.status(500).json(['Error internal server']);
  }
};
