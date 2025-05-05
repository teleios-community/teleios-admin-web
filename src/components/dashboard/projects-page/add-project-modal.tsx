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
import { CourseType, LearningPathType } from '../../../types/learning-path';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddProjectModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[] | undefined>(undefined);
  const [learningPaths, setLearningPaths] = useState<LearningPathType[] | undefined>(
    undefined
  );

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
  const getLearningPaths = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/learning-paths?page=1&page_size=100`
      );
      setLearningPaths(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourses();
    getLearningPaths();
  }, []);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      courseId: '',
      learningPathId: '',
      repoURL: '',
      category: '',
      difficultyLevel: '',
      difficultyLevelBadge: '',
      technologyTags: '',
      longDescription: '',
      maximumXP: '',
      timeEstimate: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      projectName: yup.string().required('Required'),
      description: yup.string().required('Required').min(10, 'Minimum of 10 characters'),
      courseId: yup.string().required('Required'),
      learningPathId: yup.string().required('Required'),
      repoURL: yup.string().url('Invalid URL format').required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.post(`/projects/admins`, {
        name: formik.values.projectName,
        description: formik.values.description,
        course_id: formik.values.courseId,
        learning_path_id: formik.values.learningPathId,
        repo_url: formik.values.repoURL,
        category: formik.values.category,
        difficulty_level: formik.values.difficultyLevel,
        difficulty_level_badge: formik.values.difficultyLevelBadge,
        technology_tags: formik.values.technologyTags,
        long_description: formik.values.longDescription,
        maximum_xp_assignable: Number(formik.values.maximumXP),
        time_estimate: Number(formik.values.timeEstimate),
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Project added successfully', 'success');
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
      title='Create new project'
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
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
          >
            Save
          </Button>
        </div>
      }
    >
      <div className='w-full'>
        <LabelInput
          formik={formik}
          name='projectName'
          label='Project title'
          className='mb-4'
        />
        <LabelInput
          formik={formik}
          name='description'
          label='Project description'
          className='mb-4'
        />
        <TextArea
          formik={formik}
          name='longDescription'
          label='Long Description'
          rows={3}
          className='mb-4'
        />
        <Dropdown
          options={courses?.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          name='courseId'
          formik={formik}
          placeholder='Choose course'
          className='mb-4'
          label='Course'
        />
        <Dropdown
          options={learningPaths?.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          name='learningPathId'
          formik={formik}
          placeholder='Choose learning path'
          className='mb-4'
          label='Learning path'
        />
        <LabelInput
          formik={formik}
          name='repoURL'
          type='url'
          label='Repository URL'
          className='mb-4'
        />
        <LabelInput formik={formik} name='category' label='Category' className='mb-4' />
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
          type='url'
          name='difficultyLevelBadge'
          label='Difficulty Level Badge URL'
          className='mb-4'
        />
        <LabelInput
          formik={formik}
          name='technologyTags'
          label='Technology Tags'
          className='mb-4'
          hint='Separate tags with a comma'
        />
        <LabelInput
          formik={formik}
          name='maximumXP'
          label='Project XP'
          className='mb-4'
          type='number'
        />
        <LabelInput
          formik={formik}
          name='timeEstimate'
          label='Estimated Time (Hours)'
          className='mb-4'
          type='number'
        />
      </div>
    </CustomModal>
  );
}

export default AddProjectModal;
