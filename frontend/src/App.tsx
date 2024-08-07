import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import RegisterPages from './pages/RegisterPage';
import ProtectedRouter from './components/ProtectedRouter';
import LoginPages from './pages/LoginPage';
import HomePages from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './utilities/consts.utility';
import { ForgetPasswordPage } from './pages/ForgetPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  { path: '/register', element: <RegisterPages /> },
  { path: '/login', element: <LoginPages /> },
  { path: '/forget-password', element: <ForgetPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  {
    element: <ProtectedRouter />,
    children: [
      { path: '/', element: <HomePages /> },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ProductProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </ProductProvider>
    </GoogleOAuthProvider>
  );
}
export default App;
