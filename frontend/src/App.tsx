import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContexts';
import RegisterPages from './pages/registerPage';
import LoginPages from './pages/loginPage';
import HomePages from './pages/homePage';

const router = createBrowserRouter([
  { path: '/register', element: <RegisterPages /> },
  { path: '/login', element: <LoginPages /> },
  { path: '/', element: <HomePages /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}
export default App;
