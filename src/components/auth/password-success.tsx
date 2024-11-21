import Button from 'common/button';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';

const PasswordSuccessView = () => {
  return (
    <div>
      <h1 className='text-black font-semibold text-2xl lg:text-[32px] mb-3'>
        Password reset 🎉
      </h1>
      <p className='text-[#667085] mb-10'>
        Your password has been successfully reset. Click below to sign in magically.
      </p>
      <Link to={RoutePaths.LOGIN}>
        <Button className='!w-full mt-10'>Sign in</Button>
      </Link>
    </div>
  );
};

export default PasswordSuccessView;
