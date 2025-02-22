import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import Dropdown from '../../../common/drop-down';
import LabelInput from '../../../common/label-input/LabelInput';
import { sendCatchFeedback } from '../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  openSuccessModal: () => void;
}

function AddTeamModal({ closeModal, reload, open, openSuccessModal }: Props) {
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
      await appAxios.post(`/admin/invite`, {
        email: formik.values.email,
        role: formik.values.role,
      });
      closeModal();
      reload();
      formik.resetForm();
      openSuccessModal();
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
      controls={
        <div className='flex items-center w-full justify-end'>
          <Button
            loading={loading}
            onClick={() => formik.handleSubmit()}
            className='!w-[190px] !h-10 !text-sm'
          >
            Send Invite
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput
          formik={formik}
          name='email'
          label="Team member's email address"
          type='email'
          className='mb-4'
        />
        <Dropdown
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Super Admin', value: 'super_admin' },
          ].map(({ label, value }) => ({
            label,
            value,
          }))}
          name='role'
          formik={formik}
          placeholder='Admin Type'
          className='mb-6'
          defaultValue={{
            label: formik.values.role,
            value: formik.values.role,
          }}
          label='Role'
        />
      </div>
    </CustomModal>
  );
}

export default AddTeamModal;
