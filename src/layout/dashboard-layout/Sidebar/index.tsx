import { sendCatchFeedback, sendFeedback } from 'functions/feedback';
import { LogoutCurve } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import { RoutePaths } from '../../../routes/route-paths';
import { useAppDispatch } from '../../../store/hooks';
import { navItemType, navLinks } from '../navLinks';
import styles from '../styles.module.css';
import SidebarLink from './SidebarLink';

function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await appAxios.get('/logout');
      sendFeedback('Logout successful', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      // dispatch(signOut());
      navigate(RoutePaths.LOGIN);
    }
  };
  return (
    <nav className='w-[280px] text-BrandGray60 py-8 px-5 max-h-screen sticky top-0 bottom-0 hidden lg:block bg-white overflow-y-auto '>
      <Link to={RoutePaths.DASHBOARD}>{/* <Logo /> */}</Link>
      <ul>
        <div className='flex flex-col gap-2'>
          {navLinks.map((item: navItemType) => (
            <SidebarLink item={item} key={item.href} />
          ))}
        </div>

        <li className={styles.navLink}>
          <LogoutCurve />
          <span onClick={logoutUser}>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
