import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/button';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import LabelInput from '../../../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function GenerateQuizQuestionsModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ courseId: string; sectionId: string }>();

  const formik = useFormik({
    initialValues: {
      numberOfQuestions: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      numberOfQuestions: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(
        `/quiz/sections/${params.sectionId}/generate-questions?num_questions=${formik.values.numberOfQuestions}`
      );
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Questions generated successfully', 'success');
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
      title='Generate new questions for this section'
      controls={
        <div className='flex items-center w-full justify-between flex-wrap'>
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
            className='!w-[190px] !h-10 !text-sm'
          >
            Generate
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput
          formik={formik}
          name='numberOfQuestions'
          label='Number of Questions'
          type='number'
          placeholder='Specify the number of questions to generate'
        />
      </div>
    </CustomModal>
  );
}

export default GenerateQuizQuestionsModal;
