import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, Account, DataAccount, Profile } from '../utilities/interfaces.utility';
import { registerRequest, loginRequest, profileRequest, updatePhotoProfileRequest} from '../services/auth.service';
import { authContextType } from '../utilities/interfaces.utility';
import axios from 'axios';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext<authContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth  in AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState<Profile | null>(null);
  const [googleUser, setGoogleUser] = useState<TokenResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState< File | null >(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [ profile, setProfile ] = useState([]);

  console.log(googleUser, profile);
  const signUp = async (data: DataAccount) => {
    try {
      const userRegister = {
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        password: data.password,
        birthday: data.birthday + 'T00:00:00Z',
        phoneNumber: data.phoneNumber,
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
  const authWithGoogle = () => {
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {setGoogleUser(codeResponse), console.log(codeResponse);},
      onError: (error) => console.log('Login Failed:', error),
    });
    login();
    useEffect(
      () => {
        if (googleUser) {
          axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
              headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: 'application/json',
              },
            })
            .then((res) => {
              setProfile(res.data);
            })
            .catch((err) => console.log(err));
        }
      },
      [ googleUser ],
    );
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
        isAuthenticated,
        setIsAuthenticated,
        errors,
        updatePhotoProfile,
        authWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};