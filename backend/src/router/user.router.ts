import { Router } from 'express';
import { profile, updatePhotoProfile, changePassword } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';
import { requestPasswordReset } from '../controllers/mailer.controller.ts';
import { resetPassword } from '../controllers/reset-password.controller.ts';

const router = Router();

router.post('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.put('/change', changePassword);
router.get('/request', requestPasswordReset);
router.get('/reset-password', (req, res) => {
  const token = req.query.token;
  res.send(`
    <form action="/reset-password" method="POST">
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="newPassword" placeholder="New Password" required />
      <button type="submit">Reset Password</button>
    </form>
  `);
});
router.post('/reset-password', validateToken, resetPassword);

export default router;
