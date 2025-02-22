import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../api/axios';
import Button from '../../common/button';
import LabelInput from '../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { RoutePaths } from '../../routes/route-paths';
import { useAppDispatch } from '../../store/hooks';
import { updateToken, updateUser } from '../../store/slices/user';
import { UserType } from '../../types/user';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/admin/auth/login', {
        email: formik.values.email,
        password: formik.values.password,
      });

      const loginResponseData = response.data.data;

      dispatch(
        updateToken({
          token: {
            access_token: loginResponseData.access_token,
            refresh_token: loginResponseData.refresh_token,
          },
        })
      );

      const accountResponse = await appAxios.get('/admin/auth/me', {
        headers: {
          Authorization: 'Bearer ' + loginResponseData.access_token,
        },
      });
      const accountInfo: UserType = accountResponse.data.data;
      dispatch(updateUser({ user: accountInfo }));

      // Check if account is updated
      if (
        !accountInfo.first_name ||
        !accountInfo.last_name ||
        !accountInfo.phone_number
      ) {
        // Send warning
        sendFeedback('Complete your profile');

        return navigate(RoutePaths.SETTINGS);
      }

      // Successful
      sendFeedback('Login Successful', 'success');
      formik.resetForm();
      return navigate(RoutePaths.DASHBOARD);
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-black font-semibold text-2xl lg:text-[32px] mb-3'>Login</h1>
      <p className='text-[#667085] mb-10'>
        Login to the admin portal by inputting the correct details. If you have trouble
        logging in, reach out to the engineering team.
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className=''
        />
        <div className='mt-2 text-right mb-[32px]'>
          <Link
            to={RoutePaths.FORGOT_PASSWORD}
            className='text-sm font-medium text-secondary'
          >
            Forgot password
          </Link>
        </div>

        <Button type='submit' loading={loading} className='!w-full'>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
