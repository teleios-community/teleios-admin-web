import ForgotImage from 'assets/backgrounds/auth/forgot-password.svg';
import ForgotPasswordForm from 'components/auth/forgot-password-form';
import AuthLayout from 'layout/auth-layout';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={ForgotImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
          alt='forgot-password'
        />
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
