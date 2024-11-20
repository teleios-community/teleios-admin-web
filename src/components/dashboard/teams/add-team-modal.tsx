import { appAxios } from 'api/axios';
import Button from 'common/button';
import CustomModal from 'common/custom-modal/CustomModal';
import Dropdown from 'common/drop-down';
import LabelInput from 'common/label-input/LabelInput';
import { useFormik } from 'formik';
import { sendCatchFeedback, sendFeedback } from 'functions/feedback';
import { useState } from 'react';
import * as yup from 'yup';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddTeamModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      role: 'admin',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Required'),
      role: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/admin/invite`, {
        email: formik.values.email,
        role: formik.values.role,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback(response.data?.message, 'success');
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
      title='Add New Team Member'
      width='608px'
    >
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full px-5'>
          <LabelInput
            formik={formik}
            name='email'
            label="Team member's email address"
            type='email'
            className='mb-4'
          />
          <Dropdown
            options={['admin', 'superAdmin'].map((item) => ({
              label: item,
              value: item,
            }))}
            name='role'
            formik={formik}
            placeholder='Admin Type'
            className='capitalize mb-6'
            defaultValue={{
              label: formik.values.role,
              value: formik.values.role,
            }}
            label='Role'
          />
        </div>
        <div className='w-full bg-[#F0F2F5] h-[1px] mt-5 mb-3' />
        <div className='flex items-center w-full justify-end px-5'>
          <Button type='submit' loading={loading} className='!w-[190px] !h-10 !text-sm'>
            Send Invite
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddTeamModal;
