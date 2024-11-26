import { RouteObject } from 'react-router-dom';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';

const routes: RouteObject[] = [...authRoutes, ...dashboardRoutes];

export default routes;
