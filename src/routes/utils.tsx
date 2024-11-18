import React from 'react';
import { Navigate } from 'react-router-dom';
import { sendFeedback } from '../functions/feedback';
import { getSessionDetails } from '../functions/userSession';
import { UserType } from '../types/user';
import { RoutePaths } from './route-paths';

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const currentUser: UserType | null = getSessionDetails();

  if (!currentUser) {
    sendFeedback('Login to continue');
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }
  return children;
};

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const currentUser: UserType | null = getSessionDetails();

  if (currentUser && Object.keys(currentUser).length) {
    sendFeedback('You are already logged in');
    return <Navigate to={RoutePaths.DASHBOARD} replace />;
  }
  return children;
};
