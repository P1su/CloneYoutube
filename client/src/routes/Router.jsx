import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Subscription from '../pages/Subscription/Subscription';
import Video from '../pages/Video/Video';
import Upload from '../pages/Upload/Upload';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/subscription',
        element: <Subscription />,
      },
      {
        path: '/video/:videoId',
        element: <Video />,
      },
      {
        path: 'upload',
        element: <Upload />,
      },
    ],
  },
]);

export default router;
