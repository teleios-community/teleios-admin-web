import PasswordImage from '../../assets/backgrounds/auth/set-password.svg';
import ResetPasswordForm from '../../components/auth/reset-password-form';
import AuthLayout from '../../layout/auth-layout';

const ResetPasswordPage = () => {
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
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
