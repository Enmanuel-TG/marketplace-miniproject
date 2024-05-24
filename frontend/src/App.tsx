import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthPages from './pages/AuthPage';
import RegisterPages from './pages/RegisterPage';
import ProtectedRouter  from './components/ProtectedRouter';
import LoginPages from './pages/LoginPage';
import HomePages from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;
