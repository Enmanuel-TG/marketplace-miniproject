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

//-------------------------CONST-------------------------------------
export const LEGAL_AGE = 18;
export const NAME_TOKEN = 'token';
export const IMG_DEFAULT =
  'https://res.cloudinary.com/dvqevobqi/image/upload/v1708961063/Default/30349e17-b84b-4ae7-ae0e-db4802a3dcfd.png';
