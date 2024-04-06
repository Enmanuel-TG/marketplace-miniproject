import { createContext, useContext, useEffect, useState } from 'react';
import { AuthProviderProps, Account, DataAccount } from '../utility/interfaces';
import { registerRequest, loginRequest, profileRequest} from '../api/auth';

interface useContextType {
  signUp: () => void;
  signIn: () => void;
  section: boolean;
  setSection: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setAccount: (value: Account) => void;
  setDataAccount: (value: DataAccount | object) => void;
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async () => {
    try {
      if (!account || !dataAccount) {
        throw new Error('Account or DataAccount not set');
      }
      const userRegister = {
        name: (dataAccount as DataAccount).name + ' ' + (dataAccount as DataAccount).last_name,
        email: (account as Account).email,
        password: (account as Account).password,
        birthday: (dataAccount as DataAccount).birthday + 'T00:00:00Z',
        phoneNumber: (dataAccount as DataAccount).phoneNumber,
      };
      await registerRequest(userRegister);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      //  throw new Error('Error to ' + error);
    }
  };

  const signIn = async () => {
    try {
      if (!account) {
        throw new Error('Account error');
      }
      const userLogin = {
        email: (account as Account).email,
        password: (account as Account).password,
      };
      await loginRequest(userLogin);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Account error');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await profileRequest();
        if (!res.data) {
          setIsAuthenticated(false);
        };
        setIsAuthenticated(true);
        console.log(res);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        section,
        setSection,
        setAccount,
        setDataAccount,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
