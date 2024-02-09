import 'dotenv/config.js';

//-------------------------ENV-------------------------------------
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'SECRET';
export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://my_user:my_password@localhost:5432/my_database?schema=public';
export const PORT = Number(process.env.PORT) || 1234;
export const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '7d';

//-------------------------CONST-------------------------------------
export const LEGAL_AGE = 18;
export const NAME_TOKEN = 'token';
