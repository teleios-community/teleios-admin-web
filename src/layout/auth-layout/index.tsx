import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/brand/logo-full.svg';
import { RoutePaths } from '../../routes/route-paths';

const AuthLayout = ({
  image,
  imageContent,
  children,
}: {
  image: ReactNode;
  imageContent?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  px-5 h-screen'>
      {/* form */}
      <div className='h-screen flex flex-col items-center justify-center relative'>
        <Link to={RoutePaths.LOGIN}>
          <div className='lg:absolute lg:top-5 lg:left-0 mb-10 lg:mb-0'>
            <img src={Logo} alt='Teleios' loading='lazy' />
          </div>
        </Link>
        <div className='px-primary w-full'>{children}</div>
      </div>

      {/* Image */}
      <div className='relative py-5 hidden md:block'>
        <div>{image}</div>
        {imageContent && (
          <div className='absolute bottom-10 left-5 right-5'>{imageContent}</div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
