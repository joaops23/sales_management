import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { Welcome } from './pages/Welcome';
import Dashboard from './pages/dashboard/Dashboard';
import Usuarios from './pages/Usuarios';

  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/Dashboard',
        element: <Dashboard />
    },
    {
        path: '/Usuarios',
        element: <Usuarios />
    }
]);
  