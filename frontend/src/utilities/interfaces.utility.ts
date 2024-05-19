import { ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}
export interface User {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: string;
}
export interface Profile extends User {
  photo: string;
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
  updatePhotoProfile: () => void;
  section: boolean;
  setSection: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setAccount: (value: Account) => void;
  setDataAccount: (value: DataAccount | object) => void;
  isAuthenticated: boolean | null;
  errors: string[];
  user: Profile | null;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  selectedFile: File  | null;
  setSelectedFile: (value: File) => void;
}

//---------------------------------------------------------------------------

export interface Product {
  name: string;
  price: number;
  description: string;
  location: string;
  state: string;
  category: string;
  stock: number;
}
