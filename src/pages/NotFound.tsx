import Button from 'common/button';
import { getTokenDetails } from 'functions/userSession';
import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import { useAppSelector } from 'store/hooks';

const NotFound: React.FC = () => {
  const userToken = useAppSelector(state=>state.user.token) || getTokenDetails()?.access_token
  return (
    <>
      <div className='flex items-center justify-center h-screen flex-col gap-5'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>

        <Link to={userToken ? RoutePaths.DASHBOARD : RoutePaths.LOGIN}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
