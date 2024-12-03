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
import { SectionType } from '../../../../types/learning-path';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: SectionType | undefined;
}

function EditSectionToCourseModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();

  const formik = useFormik({
    initialValues: {
      title: selected?.title || '',
      description: selected?.description || '',
      isFree: selected?.is_free ? 'Yes' : 'No',
      estimatedHours: selected?.estimated_hours || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required').min(10, 'Minimum of 10 characters'),
      isFree: yup.string().required('Required'),
      estimatedHours: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/curriculum/courses/${params.id}/sections/${selected?.id}`, {
        title: formik.values.title,
        description: formik.values.description,
        is_free: formik.values.isFree === 'Yes' ? true : false,
        estimated_hours: formik.values.estimatedHours,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Section updated', 'success');
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
      title='Update Section'
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
          value={{
            label: formik.values.isFree,
            value: formik.values.isFree,
          }}
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

export default EditSectionToCourseModal;
