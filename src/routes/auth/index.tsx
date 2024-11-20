/* eslint-disable react-refresh/only-export-components */
import { getSessionDetails } from 'functions/userSession';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import { ProtectedRoute } from 'routes/utils';
import { UserType } from 'types/user';

const LoginPage = lazy(() => import('pages/auth/login'));
const DashboardPage = lazy(() => import('../../pages/dashboard'));

const currentUser: UserType | null = getSessionDetails();

const authRoutes: RouteObject[] = [
  {
    path: RoutePaths.HOME,
    element: !currentUser ? <LoginPage /> : <DashboardPage />,
  },
  {
    path: RoutePaths.LOGIN,
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
];

export default authRoutes;
