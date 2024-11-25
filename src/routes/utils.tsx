import React from 'react';
import { Navigate } from 'react-router-dom';
import { sendFeedback } from '../functions/feedback';
import { getSessionDetails } from '../functions/userSession';
import { UserType } from '../types/user';
import { RoutePaths } from './route-paths';

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const currentUser: UserType | null = getSessionDetails();

  if (!currentUser) {
    setTimeout(() => {
      sendFeedback('Login to continue');
    }, 500);
    return <Navigate to={RoutePaths.LOGIN} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const currentUser: UserType | null = getSessionDetails();

  if (currentUser && Object.keys(currentUser).length) {
    setTimeout(() => {
      sendFeedback('You are already logged in');
    }, 500);
    return <Navigate to={RoutePaths.DASHBOARD} replace />;
  }
  return children;
};
