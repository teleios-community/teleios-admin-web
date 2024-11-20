import Button from 'common/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';

const NotFound: React.FC = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen flex-col gap-5'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>

        <Link to={RoutePaths.HOME}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
