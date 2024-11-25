import { appAxios } from 'api/axios';
import LoadingIndicator from 'common/loading-indicator';
import { sendCatchFeedback, sendFeedback } from 'functions/feedback';
import { ArrowLeft } from 'iconsax-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';

const CheckEmailView = () => {
  const [loading, setLoading] = useState(false);
  const param = useParams();

  const resendEmail = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/auth/forgot-password`, {
        email: param?.email,
      });

      // Successful
      sendFeedback(response.data.message, 'success');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-center'>
      <h1 className='text-black font-semibold text-2xl lg:text-[32px] mb-3'>
        Check your email
      </h1>
      <p className='text-[#667085] mb-10'>
        We sent a password reset link to{' '}
        <span className='font-medium'>{param?.email} </span>
      </p>
      <div className='mt-10 text-sm text-[#48565C] flex items-center text-center gap-1 justify-center'>
        Didn't receive the email?{' '}
        {loading ? (
          <LoadingIndicator size={20} />
        ) : (
          <span className='font-semibold cursor-pointer' onClick={resendEmail}>
            Click to resend
          </span>
        )}
      </div>

      <div className=' mt-10'>
        <Link
          to={RoutePaths.LOGIN}
          className='text-sm text-center flex items-center justify-center font-medium text-secondary gap-2'
        >
          <ArrowLeft />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default CheckEmailView;
