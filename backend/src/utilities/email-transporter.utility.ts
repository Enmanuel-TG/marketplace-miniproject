import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_ACCOUNT } from './consts.utility';

export const emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASSWORD,
  },
});
