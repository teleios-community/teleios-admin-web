import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import LabelInput from '../../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { AllLearnersType, SpecificLearnerType } from '../../../types/data';
YupPassword(yup); // extend yup

interface Props {
  closeModal: () => void;
  open: boolean;
  selected: AllLearnersType | SpecificLearnerType | undefined;
}

function ResetUserPasswordModal({ closeModal, selected, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required('Password is required')
        .minNumbers(1, 'At least one number is required')
        .minUppercase(1, 'At least one capital letter is required')
        .minLowercase(1, 'At least one small letter is required')
        .min(8, 'Minimum of 8 characters'),
      confirmPassword: yup
        .string()
        .required('Please confirm password')
        .oneOf([yup.ref('password'), ''], "Password doesn't match"),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/learners/change-password/${selected?.id}`, {
        new_password: formik.values.password,
        new_password_confirm: formik.values.confirmPassword,
      });
      closeModal();
      formik.resetForm();
      sendFeedback('Password reset successfully', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title="Reset user's password"
      controls={
        <div className='flex items-center w-full justify-between flex-wrap gap-5'>
          <Button
            onClick={closeModal}
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
            color='outline'
          >
            Cancel
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            loading={loading}
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
          >
            Reset
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          className='mb-4'
          type='password'
        />
        <LabelInput
          formik={formik}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
        />
      </div>
    </CustomModal>
  );
}

export default ResetUserPasswordModal;
