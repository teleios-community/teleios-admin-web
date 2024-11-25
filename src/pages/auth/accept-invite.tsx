import PasswordImage from 'assets/backgrounds/auth/set-password.svg';
import AcceptInviteForm from 'components/auth/accept-invite-form';
import AuthLayout from 'layout/auth-layout';

const AcceptInvitePage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={PasswordImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
          alt='accept-invite'
        />
      }
    >
      <AcceptInviteForm />
    </AuthLayout>
  );
};

export default AcceptInvitePage;
