import { ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

export interface User {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: string;
  password?: string;
  photo?: string;
}

export interface Profile extends User {
  id?: number;
  photo: string;
  picture?: string;
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
export interface ForgetPasswordProps {
  email: string;
}

export interface AuthContextType {
  signUp: (data: DataAccount) => void;
  signIn: (data: Account) => void;
  updatePhotoProfile: () => void;
  setIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean | null;
  errors: string[];
  user: Profile | null;
  setUser: (value: Profile | null) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  selectedFile: File | null;
  setSelectedFile: (value: File) => void;
  loginWithGoogle: () => void;
  registerWithGoogle: () => void;
  logOut: () => void;
  forgetPassword: (email: ForgetPasswordProps) => void;
  resetPassword: (password: string, confirmPassword: string, token: string) => void;
  isResetPasswordEmailSent: boolean;
  setIsResetPasswordEmailSent: (value: boolean) => void;
}

//---------------------------------------------------------------------------

export interface ProductContextType {
  allProducts: Product[];
  product: Product;
  getProduct: (id: number) => void;
  createProduct: (dataProduct: Product) => void;
  searchProduct: (name: string) => void;
  filterCategory: (category: string) => void;
}

export interface Product {
  userId: number;
  id: number;
  name: string;
  price: string;
  description: string;
  location: string;
  state: string;
  category: string;
  stock: string;
  photos: File[];
}
