import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, Account, DataAccount, Profile } from '../utilities/interfaces.utility';
import { registerRequest, loginRequest, profileRequest, updatePhotoProfileRequest} from '../services/auth.service';
import { authContextType } from '../utilities/interfaces.utility';
import axios from 'axios';

const AuthContext = createContext<authContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth  in AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [section, setSection] = useState(false);
  const [account, setAccount] = useState({});
  const [dataAccount, setDataAccount] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState<Profile | null>(null);
  const [selectedFile, setSelectedFile] = useState< File | null >(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const signIn = async (data: Account) => {
    try {
      const userLogin = {
        email: data.email,
        password: data.password,
      };
      await loginRequest(userLogin);
      setIsAuthenticated(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const updatePhotoProfile = async () => {
    try {
      if (!selectedFile) {
        throw new Error('SelectedFile error');
      }
      const res = await updatePhotoProfileRequest(selectedFile);
      const photo = res.data.newPhoto as string;
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          photo,
        };
      });
    } catch (error) {
      alert(error); //TODO: fix this ---------------------------------------------------
    }
  };
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  const checkAuth = async () => {
    try {
      const res = await profileRequest();
      if (!res.data) {
        setUser(null);
        setIsAuthenticated(false);
      };
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        isEdit,
        setIsEdit,
        user,
        signUp,
        signIn,
        section,
        setSection,
        setAccount,
        setDataAccount,
        isAuthenticated,
        setIsAuthenticated,
        errors,
        updatePhotoProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};