/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { getTokenDetails } from '../../functions/userSession';
import DashboardLayoutWithChildren from '../../layout/dashboard-layout/DashboardLayoutWithChildren';
import { RoutePaths } from '../../routes/route-paths';
import { ProtectedRoute } from '../../routes/utils';
import { store } from '../../store';

const LoginPage = lazy(() => import('../../pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('../../pages/auth/forgot-password'));
const CheckEmailPage = lazy(() => import('../../pages/auth/check-email'));
const ResetPasswordPage = lazy(() => import('../../pages/auth/reset-password'));
const PasswordSuccessPage = lazy(() => import('../../pages/auth/password-success'));
const AcceptInvitePage = lazy(() => import('../../pages/auth/accept-invite'));

const DashboardPage = lazy(() => import('../../pages/dashboard'));

const currentUser =
  store.getState().user.token?.access_token || getTokenDetails()?.access_token;

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
    path: `${RoutePaths.RESET_PASSWORD}`,
    element: (
      <ProtectedRoute>
        <ResetPasswordPage />
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
  {
    path: RoutePaths.ACCEPT_INVITE,
    element: (
      <ProtectedRoute>
        <AcceptInvitePage />
      </ProtectedRoute>
    ),
  },
];

export default authRoutes;
