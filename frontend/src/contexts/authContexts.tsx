import { createContext, useContext, ReactNode } from 'react';
import { registerRequest } from '../api/auth';

interface User {
  name: string;
  email: string;
  password: string;
  birthday: string;
  phoneNumber: string;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const signUp = async (user: User) => {
    try {
      if (user) {
        const result = await registerRequest(user);
        console.log(result);
      }
    } catch (error) {
      throw new Error('error');
    }
  };
  return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>;
};
