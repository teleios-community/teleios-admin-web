import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import Dropdown from '../../../common/drop-down';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddSectionToCourseModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isFree: '',
      estimatedHours: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required'),
      isFree: yup.string().required('Required'),
      estimatedHours: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/curriculum/courses/${params.id}/sections`, {
        title: formik.values.title,
        description: formik.values.description,
        is_free: formik.values.isFree === 'Yes' ? true : false,
        estimated_hours: formik.values.estimatedHours,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Section created successfully', 'success');
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
      title='Add Section'
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
            Create
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput formik={formik} name='title' label='Title' className='mb-4' />
        <TextArea
          formik={formik}
          name='description'
          label='Description'
          rows={3}
          className='mb-4'
        />

        <Dropdown
          options={['Yes', 'No']?.map((item) => ({
            label: item,
            value: item,
          }))}
          name='isFree'
          formik={formik}
          placeholder='Is this section free?'
          className='mb-4'
          label='Free Section?'
        />
        <LabelInput
          formik={formik}
          name='estimatedHours'
          label='Estimated Hours'
          className='mb-4'
          type='number'
        />
      </div>
    </CustomModal>
  );
}

export default AddSectionToCourseModal;
