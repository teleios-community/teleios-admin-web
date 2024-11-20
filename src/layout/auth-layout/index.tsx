import Logo from 'assets/brand/logo-full.svg';
import { ReactNode } from 'react';

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
        <img src={Logo} alt='Teleios' className='absolute top-5 left-0' loading='lazy' />
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
