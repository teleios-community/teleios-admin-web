import { FC, ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
};

const DashboardLayoutWithChildren: FC<Props> = ({ children }) => {
  return (
    <div className='max-h-screen h-full'>
      <div className='flex flex-row flex-nowrap'>
        <Sidebar />
        <main className='w-full bg-BrandBg3 overflow-auto'>
          <Navbar />
          <div className='px-[15px] py-[18px] min-h-screen'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutWithChildren;
