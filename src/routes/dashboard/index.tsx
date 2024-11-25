/* eslint-disable react-refresh/only-export-components */
import DashboardLayout from 'layout/dashboard-layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import { PrivateRoute } from 'routes/utils';

const DashboardPage = lazy(() => import('../../pages/dashboard'));
const TeamsPage = lazy(() => import('../../pages/dashboard/teams'));
const SettingsPage = lazy(() => import('../../pages/dashboard/settings'));

const dashboardRoutes: RouteObject[] = [
  {
    path: RoutePaths.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: RoutePaths.DASHBOARD,
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
        index: true,
      },
      {
        path: RoutePaths.TEAMS,
        element: (
          <PrivateRoute>
            <TeamsPage />
          </PrivateRoute>
        ),
      },
      {
        path: RoutePaths.SETTINGS,
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default dashboardRoutes;
