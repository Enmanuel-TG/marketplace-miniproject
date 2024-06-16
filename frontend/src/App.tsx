import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthPages from './pages/AuthPage';
import RegisterPages from './pages/RegisterPage';
import ProtectedRouter  from './components/ProtectedRouter';
import LoginPages from './pages/LoginPage';
import HomePages from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { GOOGLE_CLIENT_ID } from './utilities/consts.utility';

const router = createBrowserRouter([
  { path: '/register', element: <RegisterPages /> },
  { path: '/login', element: <LoginPages /> },
  { path: '/auth', element: <AuthPages /> },
  {
    element: <ProtectedRouter />,
    children: [
      { path: '/',
        element: <HomePages />,
      }, {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </AuthProvider>
    </ProductProvider>
  );
}
export default App;
