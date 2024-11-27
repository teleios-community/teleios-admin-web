import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import { sendCatchFeedback } from '../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddLearningPathModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/curriculum/learning-paths`, {
        title: formik.values.title,
        description: formik.values.description,
      });
      closeModal();
      reload();
      formik.resetForm();
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
      title='Add Learning Path'
      sideView={true}
      controls={
        <div className='flex items-center w-full justify-between flex-wrap'>
          <Button
            onClick={() => formik.handleSubmit()}
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
            Save
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput formik={formik} name='title' label='Title' className='mb-4' />
        <TextArea formik={formik} name='description' label='Description' rows={5} />
      </div>
    </CustomModal>
  );
}

export default AddLearningPathModal;
