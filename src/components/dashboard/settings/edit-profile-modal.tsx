import { appAxios } from 'api/axios';
import Button from 'common/button';
import CustomModal from 'common/custom-modal/CustomModal';
import LabelInput from 'common/label-input/LabelInput';
import { useFormik } from 'formik';
import { sendCatchFeedback, sendFeedback } from 'functions/feedback';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateUser } from 'store/slices/user';
import { UserType } from 'types/user';
import * as yup from 'yup';
import EditProfileImage from './edit-profile-image';

interface Props {
  closeModal: () => void;
  open: boolean;
}

function EditProfileModal({ closeModal, open }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      phoneNumber: user?.phone_number ? user.phone_number.replace(/\+234/g, '') : '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      phoneNumber: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/users/profile`, {
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        phone_number: `+234${formik.values.phoneNumber}`,
      });

      closeModal();
      formik.resetForm();
      sendFeedback('Profile Updated', 'success');
      dispatch(
        updateUser({
          user: {
            ...user,
            first_name: formik.values.firstName,
            last_name: formik.values.lastName,
            phone_number: `+234${formik.values.phoneNumber}`,
          } as UserType,
        })
      );
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
      title='Edit profile'
      width='608px'
    >
      <EditProfileImage />
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full px-5'>
          <LabelInput
            formik={formik}
            name='firstName'
            label='First name'
            className='mb-4'
          />
          <LabelInput
            formik={formik}
            name='lastName'
            label='Last name'
            className='mb-4'
          />
          <LabelInput
            formik={formik}
            name='phoneNumber'
            label='Phone number'
            className='mb-4'
            type='number'
          />
        </div>
        <div className='w-full bg-[#F0F2F5] h-[1px] mt-5 mb-3' />
        <div className='flex items-center w-full justify-between px-5 flex-wrap gap-5'>
          <Button
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
            color='outline'
            onClick={closeModal}
          >
            Discard
          </Button>
          <Button type='submit' loading={loading} className='!w-[190px] !h-10 !text-sm'>
            Save
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default EditProfileModal;
