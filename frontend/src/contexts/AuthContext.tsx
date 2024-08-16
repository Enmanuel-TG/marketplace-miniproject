import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, Account, DataAccount, Profile, ForgetPasswordProps } from '../utilities/interfaces.utility';
import {
  registerRequest,
  loginRequest,
  updatePhotoProfileRequest,
  forgetPasswordRequest,
  resetPasswordRequest,
  loginWithGoogleRequest,
  registerWithGoogleRequest,
  profileRequest,
} from '../services/auth.service';
import { AuthContextType } from '../utilities/interfaces.utility';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [user, setUser] = useState<Profile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await loginWithGoogleRequest(response.access_token);
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
            setIsResetPasswordEmailSent(false);
          }
        }
      }
    },
    onError: () => {
      setErrors(['Login with google error']);
    },
  });

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await registerWithGoogleRequest(
          response.access_token,
          new Date().toISOString(),
        );
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
            setIsResetPasswordEmailSent(false);
          }
        }
      }
    },
    onError: () => {
      setErrors(['Register with google error']);
    },
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

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

  const forgetPassword = async (email: ForgetPasswordProps) => {
    try {
      const res = await forgetPasswordRequest(email);
      if (res.status === 200) {
        setIsResetPasswordEmailSent(true);
      }
    } catch (error) {
      setIsResetPasswordEmailSent(false);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const resetPassword = async (password: string, confirm: string, token: string) => {
    if (password !== confirm) {
      setErrors(['Password does not match.']);
      setIsResetPasswordEmailSent(false);
    } else {
      try {
        await resetPasswordRequest(password, token);
        setIsResetPasswordEmailSent(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
            setIsResetPasswordEmailSent(false);
          }
        }
      }
    }
  };
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
        setIsResetPasswordEmailSent(false);
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
      } else {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        isEdit,
        setIsEdit,
        user,
        setUser,
        signUp,
        isAuthenticated,
        setIsAuthenticated,
        signIn,
        errors,
        updatePhotoProfile,
        loginWithGoogle,
        registerWithGoogle,
        logOut,
        forgetPassword,
        resetPassword,
        isResetPasswordEmailSent: isResetPasswordEmailSent,
        setIsResetPasswordEmailSent: setIsResetPasswordEmailSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
