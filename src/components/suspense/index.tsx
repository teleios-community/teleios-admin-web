import LoadingIndicator from 'common/LoadingIndicator';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const SuspenseLayout = () => (
  <Suspense
    fallback={
      <div className='h-screen w-screen flex items-center justify-center'>
        <LoadingIndicator size={100} />
      </div>
    }
  >
    <Outlet />
  </Suspense>
);

export default SuspenseLayout;
