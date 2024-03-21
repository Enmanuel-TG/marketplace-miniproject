import { createContext, useContext } from 'react';
import { AuthProviderProps, User } from '../utility/interfaces';
import { registerRequest } from '../api/auth';

interface useContextType {
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

  const signUp = async (user: User) => {
    await registerRequest(user);
  };

  return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>;
};
