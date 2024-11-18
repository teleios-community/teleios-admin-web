import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import UserMenu from './UserMenu';

function Navbar() {
  // const user = getSessionDetails();

  return (
    <nav className=' bg-white px-[22px] h-[70px] flex flex-row items-center sticky z-10 top-0 border-b border-b-[#F3F5F7]'>
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
