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

export interface DataAccount extends Account {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
}
export interface forgetPasswordProps {
  email: string
}

export interface authContextType {
  signUp: (data: DataAccount) => void;
  signIn: (data: Account) => void;
  updatePhotoProfile: () => void;
  setIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean | null;
  errors: string[];
  user: Profile | null;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  selectedFile: File  | null;
  setSelectedFile: (value: File) => void;
  login: () => void;
  logOut: () => void;
  forgetPassword: (email: forgetPasswordProps) => void;
  resetPassword: (password: string, confirmPassword: string, token: string) => void;
}

//---------------------------------------------------------------------------

export interface ProductContextType {
  getAllProducts: () => void;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  location: string;
  state: string;
  category: string;
  stock: number;
}
