import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/button';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import Dropdown from '../../../../common/drop-down';
import TextArea from '../../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { QuizQuestionType } from '../../../../types/learning-path';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: QuizQuestionType | undefined;
}

function ReviewQuizQuestionModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      status: selected?.status || '',
      notes: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      status: yup.string().required('Required'),
      notes: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/quiz/questions/${selected?.id}/review`, {
        status: formik.values.status,
        notes: formik.values.notes,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Question reviewed', 'success');
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
      title='Review Quiz Question'
      controls={
        <div className='flex items-center w-full justify-between flex-wrap gap-5'>
          <Button
            onClick={closeModal}
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
            color='outline'
          >
            Discard
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            loading={loading}
            className='!w-[190px] !h-10 !text-sm'
          >
            Review
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <Dropdown
          options={[
            { label: 'Pending', value: 'PENDING' },
            { label: 'Approved', value: 'APPROVED' },
            { label: 'Rejected', value: 'REJECTED' },
          ]?.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          name='status'
          formik={formik}
          placeholder='Type of content'
          className='mb-4'
          label='Content Type'
          value={{
            label: formik.values.status,
            value: formik.values.status,
          }}
        />
        <TextArea
          formik={formik}
          name='notes'
          label='Notes'
          placeholder='Type your notes here...'
          rows={3}
        />
      </div>
    </CustomModal>
  );
}

export default ReviewQuizQuestionModal;
