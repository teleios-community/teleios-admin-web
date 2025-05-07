import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { AllLearnersType, SpecificLearnerType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  selected: AllLearnersType | SpecificLearnerType | undefined;
}

function SendNotificationModal({ closeModal, selected, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      message: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/learners/admin/send-notification/${selected?.id}`, {
        title: formik.values.title,
        message: formik.values.message,
      });
      closeModal();
      formik.resetForm();
      sendFeedback('Notification sent successfully', 'success');
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
      title='Send notification'
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
            Send
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput
          formik={formik}
          name='title'
          label='Notification title'
          className='mb-4'
        />
        <TextArea formik={formik} name='message' label='Notification message' rows={3} />
      </div>
    </CustomModal>
  );
}

export default SendNotificationModal;
