import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from '../../../routes/route-paths';
import { navItemType } from '../navLinks';
import styles from '../styles.module.css';

const SidebarLink = ({ item }: { item: navItemType }) => {
  const location = useLocation();

  const checkRouteMatch = (route: string) => {
    const path = location.pathname;
    if (route === RoutePaths.DASHBOARD) {
      // Check for base routes
      return path === route;
    }
    return path.includes(route);
  };
  return (
    <Link to={item.href}>
      <li className={checkRouteMatch(item.href) ? styles.activeNavLink : styles.navLink}>
        {item.icon}
        <span>{item.label}</span>
      </li>
    </Link>
  );
};

export default SidebarLink;
