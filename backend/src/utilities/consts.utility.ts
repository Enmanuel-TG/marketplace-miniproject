import 'dotenv/config.js';

//-------------------------ENV-------------------------------------
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'SECRET';
export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://my_user:my_password@localhost:5432/my_database?schema=public';
export const PORT = Number(process.env.PORT) || 1234;
export const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '7d';
export const CLOUDINARY_NAME = process.env.CLOUD_NAME;
export const KEY = process.env.API_KEY;
export const SECRET = process.env.API_SECRET;
export const MAIN_ADMIN = process.env.MAIN_ADMIN;
export const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const GOOGLE_API_URL = process.env.GOOGLE_API_URL;
export const TOKEN_PASSWORD_RESET = process.env.TOKEN_PASSWORD_RESET_EXPIRES;

//-------------------------CONST-------------------------------------
export const LEGAL_AGE = 18;
export const NAME_TOKEN = 'token';
export const PHOTO_PROFILE_FOLDER = 'ftProfile';
export const PHOTOS_PRODUCT_FOLDER = 'ftProduct';
export const IMG_DEFAULT =
  'https://res.cloudinary.com/dvqevobqi/image/upload/v1708961063/Default/30349e17-b84b-4ae7-ae0e-db4802a3dcfd.png';
export const enum ROLES {
  admin = 'admin',
  user = 'user',
}
