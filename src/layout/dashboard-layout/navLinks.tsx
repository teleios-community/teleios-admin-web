import {
  // Award,
  Book1,
  Element3,
  People,
  ProfileTick,
  // Rank,
  Setting2,
  Stacks,
  Sun1,
  TaskSquare,
} from 'iconsax-react';
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
    icon: <Element3 size={18} />,
  },
  {
    label: 'Learning paths',
    href: RoutePaths.LEARNING_PATHS,
    icon: <Book1 size={18} />,
  },

  {
    label: 'Learners',
    href: RoutePaths.LEARNERS,
    icon: <ProfileTick size={18} />,
  },
  {
    label: 'Mentors',
    href: RoutePaths.MENTORS,
    icon: <Sun1 size={18} />,
  },

  {
    label: 'Projects',
    href: RoutePaths.PROJECTS,
    icon: <TaskSquare size={18} />,
  },

  {
    label: 'Tiers',
    href: RoutePaths.TIERS,
    icon: <Stacks size={18} />,
  },
  // {
  //   label: 'Certificates',
  //   href: RoutePaths.CERTIFICATES,
  //   icon: <Award size={18} />,
  // },
  // {
  //   label: 'Leaderboard',
  //   href: RoutePaths.LEADERBOARD,
  //   icon: <Rank size={18} />,
  // },
  {
    label: 'Teams',
    href: RoutePaths.TEAMS,
    icon: <People size={18} />,
  },
  {
    label: 'Settings',
    href: RoutePaths.SETTINGS,
    icon: <Setting2 size={18} />,
  },
];
