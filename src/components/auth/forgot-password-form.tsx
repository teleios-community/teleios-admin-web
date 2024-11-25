import { useFormik } from 'formik';
import { ArrowLeft } from 'iconsax-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../api/axios';
import Button from '../../common/button';
import LabelInput from '../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { RoutePaths } from '../../routes/route-paths';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post('/auth/forgot-password', {
        email: formik.values.email,
      });

      // Successful
      sendFeedback('Verification email sent', 'success');
      navigate(`${RoutePaths.CHECK_EMAIL}/${formik.values.email}`);
      return formik.resetForm();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-black font-semibold text-2xl lg:text-[32px] mb-3'>
        Forgot Password
      </h1>
      <p className='text-[#667085] mb-10'>
        That's fine, it happens. Enter your registered email address to get reset
        instructions.
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-8'
        />

        <Button type='submit' loading={loading} className='!w-full'>
          Reset password
        </Button>

        <div className=' mt-10'>
          <Link
            to={RoutePaths.LOGIN}
            className='text-sm text-center flex items-center justify-center font-medium text-secondary gap-2'
          >
            <ArrowLeft />
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
