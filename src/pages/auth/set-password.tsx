import PasswordImage from 'assets/backgrounds/auth/set-password.svg';
import SetPasswordForm from 'components/auth/set-password-form';
import AuthLayout from 'layout/auth-layout';

const SetPasswordPage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={PasswordImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
          alt='set-password'
        />
      }
    >
      <SetPasswordForm />
    </AuthLayout>
  );
};

export default SetPasswordPage;
