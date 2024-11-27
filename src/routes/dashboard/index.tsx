/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../../layout/dashboard-layout';
import { RoutePaths } from '../../routes/route-paths';
import { PrivateRoute } from '../../routes/utils';

const DashboardPage = lazy(() => import('../../pages/dashboard'));
const TeamsPage = lazy(() => import('../../pages/dashboard/teams'));
const SettingsPage = lazy(() => import('../../pages/dashboard/settings'));
const LearningPathsPage = lazy(() => import('../../pages/dashboard/learning-paths'));

const dashboardRoutes: RouteObject[] = [
  {
    path: RoutePaths.DASHBOARD,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: RoutePaths.DASHBOARD,
        element: <DashboardPage />,
        index: true,
      },
      {
        path: RoutePaths.TEAMS,
        element: <TeamsPage />,
      },
      {
        path: RoutePaths.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: RoutePaths.LEARNING_PATHS,
        element: <LearningPathsPage />,
      },
    ],
  },
];

export default dashboardRoutes;
