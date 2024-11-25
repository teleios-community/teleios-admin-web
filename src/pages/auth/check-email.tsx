import EmailImage from '../../assets/backgrounds/auth/check-email.svg';
import CheckEmailView from '../../components/auth/check-email';
import AuthLayout from '../../layout/auth-layout';

const CheckEmailPage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={EmailImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
          alt='check-email'
        />
      }
    >
      <CheckEmailView />
    </AuthLayout>
  );
};

export default CheckEmailPage;
