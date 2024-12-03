import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../routes/route-paths';
import UserMenu from './UserMenu';

function Navbar() {
  // const user = getSessionDetails();

  return (
    <nav className='border-l bg-white px-primary h-[78px] flex flex-row items-center sticky z-10 top-0 border-b border-b-[#F0F2F5]'>
      <div className='flex flex-row items-center justify-between lg:justify-end w-full'>
        <Link
          to={RoutePaths.DASHBOARD}
          className='cursor-pointer object-contain lg:hidden h-[34.48px]'
        >
          {/* <Logo /> */}
        </Link>

        <UserMenu />
      </div>
    </nav>
  );
}

export default Navbar;
