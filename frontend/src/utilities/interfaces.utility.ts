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
  description?: string;
  createdAt?: string;
}

export type UpdateUser = Pick<User, 'name' | 'birthday' | 'phoneNumber' | 'description'>;

export interface Profile extends User {
  id?: number;
  photo: string;
  picture?: string;
  description: string;
  role: string;
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
  updatePhotoProfile: (selectedFile: File) => void;
  setIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean | null;
  errors: string[];
  setErrors: (value: string[]) => void;
  user: Profile | null;
  setUser: (value: Profile | null) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  loginWithGoogle: () => void;
  registerWithGoogle: () => void;
  logOut: () => void;
  forgetPassword: (email: ForgetPasswordProps) => void;
  resetPassword: (password: string, confirmPassword: string, token: string) => void;
  isResetPasswordEmailSent: boolean;
  setIsResetPasswordEmailSent: (value: boolean) => void;
  getDataUser: (id: number) => void;
  userData: Profile | null;
  setUserData: (value: Profile | null) => void;
  updatedDescription: (description: Profile['description']) => void;
}

//---------------------------------------------------------------------------

export interface ProductContextType {
  allProducts: Product[];
  product: Product;
  getProduct: (id: number) => void;
  createProduct: (dataProduct: Product) => Promise<ProductResponse>;
  searchProduct: (name: string) => void;
  filterCategory: (category: string) => void;
  errors: string[];
  updateProduct: (dataProduct: Product) => Promise<ProductResponse>;
  getAllUSerProducts: () => void;
  deleteProduct: (id: number) => void;
  setProduct: (value: Product) => void;
  updateStock: (stock: number, id: string) => Promise<number>;
  setErrors: (value: string[]) => void;
  getAllProducts: () => Promise<void>;
}

export interface ProductResponse {
  message: string;
  product: Product;
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
  stock: number;
  photos: File[];
}
