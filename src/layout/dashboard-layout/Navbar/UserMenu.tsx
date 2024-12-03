import autoAnimate from '@formkit/auto-animate';
import { ArrowDown2 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { Link, useNavigate } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import DefaultImage from '../../../assets/images/default-profile-image.svg';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { RoutePaths } from '../../../routes/route-paths';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signOut } from '../../../store/slices/user';
import { navItemType, navLinks } from '../navLinks';
import Notification from './Notification';

function UserMenu() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const parentRef = useRef(null);

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

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className='flex items-center self-end gap-4' ref={parentRef}>
        <Notification />
        <div className='h-[49px] w-[1px] bg-[#EAEBED]' />
        <div className='relative'>
          <button onClick={() => setOpen(true)} className='flex items-center relative'>
            <div className='w-[39px] h-[39px]  flex items-center justify-center rounded-full mr-[5px]'>
              <div className='w-10 h-10 rounded-full p-1 bg-[#F4CE9B] flex items-center justify-center'>
                <img
                  src={user?.profile_picture_url || DefaultImage}
                  alt='user'
                  className='w-8 h-8 object-contain rounded-full'
                />
              </div>
            </div>
            <div className='md:flex flex-col items-start mr-2 ml-2 hidden'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='capitalize font-medium'>
                    {(user?.first_name || 'First') + ' ' + (user?.last_name || 'Last')}
                  </span>
                  <ArrowDown2 size={16} />
                </div>
                <span className='capitalize text-sm text-[#91999D] text-left'>Admin</span>
              </div>
            </div>
          </button>
          {open && (
            <nav
              className='rounded absolute right-0 top-14 bg-white w-40'
              style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
            >
              <ul className='flex flex-col'>
                {navLinks.map((item: navItemType) => (
                  <Link to={item.href} key={item.href}>
                    <li className='p-2 hover:bg-primary hover:text-white text-sm'>
                      {item.label}
                    </li>
                  </Link>
                ))}

                <button
                  onClick={logoutUser}
                  className='p-2 text-sm hover:bg-primary text-error text-justify hover:text-white '
                >
                  Logout
                </button>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default UserMenu;
