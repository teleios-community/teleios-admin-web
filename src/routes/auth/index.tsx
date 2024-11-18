import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';

const LoginPage = lazy(() => import('pages/auth/login'));
// const DashboardPage = lazy(() => import('../../pages/dashboard'));

// const currentUser: UserType | null = getSessionDetails();

const authRoutes: RouteObject[] = [
  {
    path: RoutePaths.HOME,
    // element: !currentUser ? <LoginPage /> : <DashboardPage />,
    element: <LoginPage />,
  },
  // {
  //   path: RoutePaths.LOGIN,
  //   element: (
  //     <ProtectedRoute>
  //       <Login />
  //     </ProtectedRoute>
  //   ),
  // },
];

export default authRoutes;
