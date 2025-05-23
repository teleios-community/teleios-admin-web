import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/button';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import Dropdown from '../../../../common/drop-down';
import LabelInput from '../../../../common/label-input/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddLessonToSection({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ courseId: string; sectionId: string }>();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      isFree: '',
      contentType: '',
      videoURL: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      isFree: yup.string().required('Required'),
      contentType: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    if (formik.values.contentType === 'video' && !formik.values.videoURL) {
      return sendFeedback('Video URL is required', 'error');
    }
    if (formik.values.contentType === 'text' && !formik.values.content) {
      return sendFeedback('Content is required', 'error');
    }

    try {
      setLoading(true);
      await appAxios.post(
        `/curriculum/courses/${params.courseId}/sections/${params.sectionId}/lessons`,
        {
          title: formik.values.title,
          ...(formik.values.content && { content: formik.values.content }),
          ...(formik.values.videoURL && { video_url: encodeURI(formik.values.videoURL) }),
          ...(formik.values.videoURL && { video_duration: 10 }),
          is_free: formik.values.isFree === 'Yes' ? true : false,
          content_type: formik.values.contentType,
        }
      );
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Lesson created successfully', 'success');
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
      title='Add Lesson'
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
        <LabelInput formik={formik} name='title' label='Title' className='mb-4' />
        <Dropdown
          options={[
            { label: 'Text', value: 'text' },
            { label: 'Video', value: 'video' },
          ]?.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          name='contentType'
          formik={formik}
          placeholder='Type of content'
          className='mb-4'
          label='Content Type'
        />
        {formik.values.contentType === 'video' && (
          <LabelInput
            formik={formik}
            name='videoURL'
            label='Video URL'
            className='mb-4'
          />
        )}
        {formik.values.contentType === 'text' && (
          <LabelInput formik={formik} name='content' label='Content' className='mb-4' />
        )}

        <Dropdown
          options={['Yes', 'No']?.map((item) => ({
            label: item,
            value: item,
          }))}
          name='isFree'
          formik={formik}
          placeholder='Is this lesson free?'
          className='mb-4'
          label='Free lesson?'
        />
      </div>
    </CustomModal>
  );
}

export default AddLessonToSection;
