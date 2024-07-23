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
import { ProductPage } from './pages/ProductPage';


const router = createBrowserRouter([
  { path: '/register', element: <RegisterPages /> },
  { path: '/login', element: <LoginPages /> },
  { path: '/', element: <HomePages /> },
  { path: '/forget-password', element: <ForgetPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/product/:id', element: <ProductPage /> },
  {
    element: <ProtectedRouter />,
    children: [
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
