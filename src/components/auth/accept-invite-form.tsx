import { appAxios } from 'api/axios';
import Button from 'common/button';
import LabelInput from 'common/label-input/LabelInput';
import { useFormik } from 'formik';
import { sendCatchFeedback, sendFeedback } from 'functions/feedback';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutePaths } from 'routes/route-paths';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup); // extend yup

const AcceptInviteForm = () => {
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
        .min(12, 'Minimum of 12 characters')
        .minUppercase(1, 'Must contain at least 1 uppercase letter'),
      confirmPassword: yup
        .string()
        .required('Please confirm new password')
        .oneOf([yup.ref('newPassword'), ''], 'The passwords you entered do not match'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/admin/accept-invite', {
        invite_token: token,
        password: formik.values.newPassword,
        password_confirm: formik.values.confirmPassword,
      });

      // Successful
      sendFeedback(response.data.message || 'Password set successfully', 'success');
      navigate(RoutePaths.LOGIN);
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
        Accept Invite
      </h1>
      <p className='text-[#667085] mb-10'>
        Welcome to Teleios Admin. Set your password to continue
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='newPassword'
          label='New password'
          type='password'
          className='mb-6'
          hint='Must be at least 12 characters.'
        />
        <LabelInput
          formik={formik}
          name='confirmPassword'
          label='Confirm new password'
          type='password'
          className='mb-6'
        />

        <Button type='submit' loading={loading} className='!w-full'>
          Set Password
        </Button>
      </form>
    </div>
  );
};

export default AcceptInviteForm;
