/* eslint-disable react-refresh/only-export-components */
import { getSessionDetails } from 'functions/userSession';
import DashboardLayoutWithChildren from 'layout/dashboard-layout/DashboardLayoutWithChildren';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import { ProtectedRoute } from 'routes/utils';
import { UserType } from 'types/user';

const LoginPage = lazy(() => import('pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('pages/auth/forgot-password'));
const CheckEmailPage = lazy(() => import('pages/auth/check-email'));
const SetPasswordPage = lazy(() => import('pages/auth/set-password'));
const PasswordSuccessPage = lazy(() => import('pages/auth/password-success'));

const DashboardPage = lazy(() => import('../../pages/dashboard'));

const currentUser: UserType | null = getSessionDetails();

const authRoutes: RouteObject[] = [
  {
    path: RoutePaths.HOME,
    element: !currentUser ? (
      <LoginPage />
    ) : (
      <DashboardLayoutWithChildren>
        <DashboardPage />
      </DashboardLayoutWithChildren>
    ),
  },
  {
    path: RoutePaths.LOGIN,
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.FORGOT_PASSWORD,
    element: (
      <ProtectedRoute>
        <ForgotPasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${RoutePaths.CHECK_EMAIL}/:email`,
    element: (
      <ProtectedRoute>
        <CheckEmailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${RoutePaths.SET_PASSWORD}/:email`,
    element: (
      <ProtectedRoute>
        <SetPasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.PASSWORD_SUCCESS,
    element: (
      <ProtectedRoute>
        <PasswordSuccessPage />
      </ProtectedRoute>
    ),
  },
];

export default authRoutes;
