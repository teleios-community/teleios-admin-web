import { LogoutCurve } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import Logo from '../../../assets/brand/logo-full.svg';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { RoutePaths } from '../../../routes/route-paths';
import { useAppDispatch } from '../../../store/hooks';
import { signOut } from '../../../store/slices/user';
import { navItemType, navLinks } from '../navLinks';
import styles from '../styles.module.css';
import SidebarLink from './SidebarLink';

function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await appAxios.post('/auth/logout');
      sendFeedback('Logout successful', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(signOut());
      navigate(RoutePaths.LOGIN);
    }
  };
  return (
    <nav className='w-[270px] h-screen sticky top-0 bottom-0 hidden lg:block bg-white'>
      <div className='h-[78px] border-b border-b-[#F0F2F5] w-full flex items-center justify-center'>
        <Link to={RoutePaths.DASHBOARD}>
          <img src={Logo} alt='Teleios' className='w-[50px] h-[57px] object-contain' />
        </Link>
      </div>
      <ul className='px-4 py-16 h-[calc(100vh-100px)] overflow-auto lg:overflow-hidden'>
        <div className='flex flex-col gap-4 h-full'>
          {navLinks.map((item: navItemType) => (
            <SidebarLink item={item} key={item.href} />
          ))}
        </div>

        <li
          className={'!text-error flex-1 mt-auto ' + styles.navLink}
          onClick={logoutUser}
        >
          <LogoutCurve />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
