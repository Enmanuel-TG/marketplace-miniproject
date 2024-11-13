/* eslint-disable indent */
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateSchema =
  <T extends z.ZodType<unknown, z.ZodTypeDef>>(Schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.errors.map((issue: z.ZodIssue) => issue.message));
      } else {
        return res.status(500).json(['Error internal server.']);
      }
    }
    return;
  };

export default validateSchema;
