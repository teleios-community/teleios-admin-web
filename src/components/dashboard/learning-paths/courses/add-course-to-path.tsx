import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/button';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import Dropdown from '../../../../common/drop-down';
import LabelInput from '../../../../common/label-input/LabelInput';
import TextArea from '../../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddCourseToPathModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      shortDescription: '',
      tags: '',
      difficultyLevel: '',
      estimatedHours: '',
      learningObjectives: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required').min(10, 'Minimum of 10 characters'),
      shortDescription: yup.string().optional().max(200, 'Maximum of 200 characters'),
      difficultyLevel: yup.string().required('Required'),
      estimatedHours: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/curriculum/courses`, {
        title: formik.values.title,
        description: formik.values.description,
        short_description: formik.values.shortDescription,
        learning_path_ids: [params.id],
        difficulty_level: formik.values.difficultyLevel,
        estimated_hours: formik.values.estimatedHours,
        tags: formik.values.tags.split(',').map((item) => item.trim()),
        learning_objectives: formik.values.learningObjectives
          .split(',')
          .map((item) => item.trim()),
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Course created successfully', 'success');
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
      title='Add Course'
      sideView={true}
      controls={
        <div className='flex items-center w-full justify-between flex-wrap'>
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
        <LabelInput
          formik={formik}
          name='shortDescription'
          label='Short description'
          className='mb-4'
        />

        <Dropdown
          options={['beginner', 'intermediate']?.map((item) => ({
            label: item,
            value: item,
          }))}
          name='difficultyLevel'
          formik={formik}
          placeholder='Select difficulty'
          className='mb-4 capitalize'
          label='Difficulty'
        />
        <LabelInput
          formik={formik}
          name='estimatedHours'
          label='Estimated Hours'
          className='mb-4'
          type='number'
        />
        <LabelInput
          formik={formik}
          name='learningObjectives'
          label='Learning Objectives'
          className='mb-4'
          hint='Separate objectives with a comma'
        />
        <LabelInput
          formik={formik}
          name='tags'
          label='Tags'
          className='mb-4'
          hint='Separate objectives with a comma'
        />
      </div>
    </CustomModal>
  );
}

export default AddCourseToPathModal;
