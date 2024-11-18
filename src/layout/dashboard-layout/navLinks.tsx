import { Home } from 'iconsax-react';
import { ReactNode } from 'react';
import { RoutePaths } from '../../routes/route-paths';

export interface navItemType {
  label: string;
  href: string;
  icon?: ReactNode;
}

export const navLinks: navItemType[] = [
  {
    label: 'Dashboard',
    href: RoutePaths.DASHBOARD,
    icon: <Home />,
  },
];
