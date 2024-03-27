import { createContext, useContext, useState } from 'react';
import { AuthProviderProps, Account, DataAccount } from '../utility/interfaces';
import { registerRequest, LoginRequest } from '../api/auth';

interface useContextType {
  signUp: () => void;
  signIn: () => void;
  section: boolean;
  setSection: (value: boolean) => void;
  setAccount: (value: Account) => void;
  setDataAccount: (value: DataAccount | object) => void;
}

const AuthContext = createContext<useContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth  in AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [section, setSection] = useState(false);
  const [account, setAccount] = useState({});
  const [dataAccount, setDataAccount] = useState({});

  const signUp = async () => {
    try {
      if (!account || !dataAccount) {
        throw new Error('Account or DataAccount not set');
      }
      const userRegister = {
        name: (dataAccount as DataAccount).name + ' ' + (dataAccount as DataAccount).last_name,
        email: (account as Account).email,
        password: (account as Account).password,
        birthday: (dataAccount as DataAccount).birthday +   'T00:00:00Z',
        phoneNumber: (dataAccount as DataAccount).phoneNumber,
      };
      console.log(userRegister);
      await registerRequest(userRegister);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    if (!account) {
      throw new Error('Account not set');
    }
    const userLogin = {
      email: (account as Account).email,
      password: (account as Account).password,
    };
    await LoginRequest(userLogin);
  };

  return <AuthContext.Provider
    value={{
      signUp,
      signIn,
      section,
      setSection,
      setAccount,
      setDataAccount,
    }}>{children}
  </AuthContext.Provider>;
};
