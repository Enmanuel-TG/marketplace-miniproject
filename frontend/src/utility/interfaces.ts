import { ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface User {
  name: string;
  email: string;
  password: string;
  birthday: string;
  phoneNumber: string;
}

export interface Account {
  email: string;
  password: string;
}

export interface DataAccount {
  name: string;
  last_name: string;
  birthday: string;
  phoneNumber: string;
}

export interface useContextType {
  signUp: () => void;
  signIn: () => void;
  section: boolean;
  setSection: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setAccount: (value: Account) => void;
  setDataAccount: (value: DataAccount | object) => void;
  isAuthenticated: boolean;
  errors: string[];
}
