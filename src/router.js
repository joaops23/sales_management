import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { Welcome } from './pages/Welcome';

  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },
    {
        path: '/login',
        element: <Login />
    },
]);
  