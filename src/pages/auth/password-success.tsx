import PasswordImage from 'assets/backgrounds/auth/set-password.svg';
import PasswordSuccessView from 'components/auth/password-success';
import AuthLayout from 'layout/auth-layout';

const PasswordSuccessPage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={PasswordImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
          alt='check-email'
        />
      }
    >
      <PasswordSuccessView />
    </AuthLayout>
  );
};

export default PasswordSuccessPage;
