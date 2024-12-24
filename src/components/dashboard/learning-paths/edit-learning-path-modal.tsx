import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import Dropdown from '../../../common/drop-down';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { LearningPathType } from '../../../types/learning-path';
import LearningPathThumbnail from './learning-path-thumbnail';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: LearningPathType | undefined;
}

function EditLearningPathModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: selected?.title || '',
      description: selected?.description || '',
      difficultyLevel: selected?.difficulty_level || '',
      estimatedHours: selected?.estimated_hours || '',
      learningObjectives: selected?.learning_objectives?.join(', ') || '',
      prerequisites: selected?.prerequisites || '',
      thumbnail: selected?.thumbnail_url || '',
      status: selected?.status || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required'),
      difficultyLevel: yup.string().required('Required'),
      status: yup.string().required('Required'),
      estimatedHours: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/curriculum/learning-paths/${selected?.id}`, {
        title: formik.values.title,
        description: formik.values.description,
        status: formik.values.status,
        difficulty_level: formik.values.difficultyLevel,
        estimated_hours: formik.values.estimatedHours,
        learning_objectives: formik.values.learningObjectives
          .split(',')
          .map((item) => item.trim()),
        prerequisites: formik.values.prerequisites,
        thumbnail_url: formik.values.thumbnail,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Learning path updated', 'success');
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
      title='Edit Learning Path'
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
            Save
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        {/* Thumbnail */}
        <LearningPathThumbnail
          imageValue={formik.values.thumbnail}
          setImageValue={(value) => formik.setFieldValue('thumbnail', value)}
        />
        <LabelInput formik={formik} name='title' label='Title' className='mb-4' />
        <TextArea
          formik={formik}
          name='description'
          label='Description'
          rows={3}
          className='mb-4'
        />
        <Dropdown
          options={[
            {
              label: 'Draft',
              value: 'draft',
            },
            {
              label: 'Published',
              value: 'published',
            },
            {
              label: 'Archived',
              value: 'archived',
            },
          ]?.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          name='status'
          formik={formik}
          placeholder='Select status'
          className='mb-4'
          label='Status'
          value={{
            label: formik.values.status,
            value: formik.values.status,
          }}
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
          name='prerequisites'
          label='Prerequisites (optional)'
        />
      </div>
    </CustomModal>
  );
}

export default EditLearningPathModal;
