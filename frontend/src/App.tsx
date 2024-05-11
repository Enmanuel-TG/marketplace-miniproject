import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContexts';
import AuthPages from './pages/authPage';
import RegisterPages from './pages/registerPage';
import ProtectedRouter  from './ProtectedRouter';
import LoginPages from './pages/loginPage';
import HomePages from './pages/homePage';
import ProfilePage from './pages/profilePage';

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
