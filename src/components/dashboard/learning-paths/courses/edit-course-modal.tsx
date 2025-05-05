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
import { CourseType } from '../../../../types/learning-path';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: CourseType | undefined;
}

function EditSectionToCourseModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();

  const formik = useFormik({
    initialValues: {
      title: selected?.title || '',
      description: selected?.description || '',
      shortDescription: selected?.short_description || '',
      tags: selected?.tags.join(', ') || '',
      difficultyLevel: selected?.difficulty_level || '',
      estimatedHours: selected?.estimated_hours || '',
      learningObjectives: selected?.learning_objectives.join(', ') || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required').min(10, 'Minimum of 10 characters'),
      difficultyLevel: yup.string().required('Required'),
      estimatedHours: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/curriculum/courses/${selected?.id}`, {
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
      sendFeedback('Course updated', 'success');
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
      title='Update Course'
      sideView={true}
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
            Update
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
          value={{
            label: formik.values.difficultyLevel,
            value: formik.values.difficultyLevel,
          }}
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

export default EditSectionToCourseModal;
