import { Request, Response, NextFunction } from 'express';

const validateSchema = (Schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    Schema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json(error.errors.map((error: { message: any }) => error.message));
  }
  return;
};

export default validateSchema;
