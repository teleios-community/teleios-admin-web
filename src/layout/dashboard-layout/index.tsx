import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout: FC = () => {
  return (
    <div className='max-h-screen h-full'>
      <div className='flex flex-row flex-nowrap'>
        <Sidebar />
        <main className='w-full bg-[#FBFBFB] overflow-auto'>
          <Navbar />
          <div className='px-primary py-[18px] min-h-screen '>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
