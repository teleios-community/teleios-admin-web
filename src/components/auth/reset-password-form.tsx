import { useFormik } from 'formik';
import { ArrowLeft } from 'iconsax-react';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../api/axios';
import Button from '../../common/button';
import LabelInput from '../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { RoutePaths } from '../../routes/route-paths';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Minimum of 8 characters'),
      confirmPassword: yup
        .string()
        .required('Please confirm new password')
        .oneOf([yup.ref('newPassword'), ''], 'The passwords you entered do not match'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post('/admin/auth/reset-password', {
        token,
        new_password: formik.values.newPassword,
        new_password_confirm: formik.values.confirmPassword,
      });

      // Successful
      sendFeedback('Password reset successfully', 'success');
      navigate(RoutePaths.PASSWORD_SUCCESS);
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
        Set new password
      </h1>
      <p className='text-[#667085] mb-10'>
        Your new password should be different from previously used passwords
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='newPassword'
          label='New password'
          type='password'
          className='mb-6'
          hint='Must be at least 8 characters.'
        />
        <LabelInput
          formik={formik}
          name='confirmPassword'
          label='Confirm new password'
          type='password'
          className='mb-6'
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

export default ResetPasswordForm;
