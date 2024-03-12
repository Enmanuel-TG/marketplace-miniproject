import React, { createContext, useContext } from 'react';
import { AuthProviderProps, User } from '../utility/interfaces';
import { registerRequest } from '../api/auth';

interface useContextType {
  theme: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  signUp: ( user: User) => void;
}

const AuthContext = createContext<useContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useTheme  in ThemeProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [theme, setTheme] = React.useState('light');
  const [user, setUser] = React.useState<User>({
    name: '',
    email: '',
    password: '',
    birthday: '',
    phoneNumber: '',
  });

  const signUp = async (user: User) => {
    await registerRequest(user);
    console.log(user);
  };

  return <AuthContext.Provider value={{ theme, setTheme, user, setUser, signUp }}>{children}</AuthContext.Provider>;
};
