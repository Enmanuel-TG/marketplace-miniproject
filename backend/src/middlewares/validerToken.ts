// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { TOKEN_SECRET } from '';

// export const authRequired = (req: Request, res: Response, next: NextFunction) => {
//     const { token } = req.cookies;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//     jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid token' });
//         }
//         req.user = user;
//         next();
//     });
// };
