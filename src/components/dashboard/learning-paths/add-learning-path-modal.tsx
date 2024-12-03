import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import Dropdown from '../../../common/drop-down';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { CourseType } from '../../../types/learning-path';
import LearningPathThumbnail from './learning-path-thumbnail';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddLearningPathModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[] | undefined>(undefined);

  const getCourses = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/curriculum/courses?page=1&page_size=100`);
      setCourses(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      courses: [],
      difficultyLevel: '',
      estimatedHours: '',
      learningObjectives: '',
      prerequisites: '',
      thumbnail: '',
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
  });

  const submitValues = async () => {
    try {
      if (!formik.values.thumbnail) {
        return sendFeedback('Please upload a thumbnail', 'error');
      }
      setLoading(true);
      await appAxios.post(`/curriculum/learning-paths`, {
        title: formik.values.title,
        description: formik.values.description,

        course_ids: formik.values.courses.map(
          (item: { label: string; value: string }) => item.value
        ),
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
      sendFeedback('Learning path added successfully', 'success');
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
          options={courses?.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          isMulti
          name='courses'
          formik={formik}
          placeholder='Select courses'
          className='mb-4'
          label='Courses'
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
          name='prerequisites'
          label='Prerequisites (optional)'
        />
      </div>
    </CustomModal>
  );
}

export default AddLearningPathModal;
