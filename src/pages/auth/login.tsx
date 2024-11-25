import LoginImage from 'assets/backgrounds/auth/login.png';
import LoginForm from 'components/auth/login-form';
import AuthLayout from 'layout/auth-layout';

const LoginPage = () => {
  return (
    <AuthLayout
      image={
        <img
          src={LoginImage}
          className='h-[calc(100vh-40px)] w-full object-cover rounded-3xl'
          loading='lazy'
        />
      }
      imageContent={
        <div
          className='bg-[#EBEBEB33] w-full p-5 flex flex-col items-center blur-[20%] text-center rounded-xl gap-2'
          style={{
            border: '1px solid',
            borderImageSource:
              'linear-gradient(257.96deg, #FFFFFF -0.34%,rgba(255, 255, 255, 0) 47.29%)',
          }}
        >
          <p className='text-white font-extrabold font-secondary text-[25px] xl:text-[40px]'>
            Welcome to Teleios Admin
          </p>
          <p className='text-[#F2F2F2]'>
            Perform several actions like managing courses, tracking learner progress and
            optimizing the learning experience for all users.
          </p>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
