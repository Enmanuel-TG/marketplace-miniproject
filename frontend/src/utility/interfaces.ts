import { ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  password: string;
  birthday: string;
  phoneNumber: string;
}
export interface AuthProviderProps {
  children: ReactNode;
}
