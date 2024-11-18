import DashboardLayoutWithChildren from 'layout/dashboard-layout/DashboardLayoutWithChildren';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <DashboardLayoutWithChildren>
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      </div>
    </DashboardLayoutWithChildren>
  );
};

export default NotFound;
