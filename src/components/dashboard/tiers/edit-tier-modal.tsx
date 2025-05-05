import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import LabelInput from '../../../common/label-input/LabelInput';
import TextArea from '../../../common/text-area/TextArea';
import Thumbnail from '../../../common/thumbnail';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { TierType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: TierType | undefined;
}

function EditTierModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selected?.name || '',
      description: selected?.description || '',
      needed_experience_points: selected?.needed_experience_points || '',
      thumbnail: selected?.badge_url || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      description: yup.string().required('Required').min(10, 'Minimum of 10 characters'),
      needed_experience_points: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/tiers/${selected?.id}`, {
        name: formik.values.name,
        description: formik.values.description,
        needed_experience_points: formik.values.needed_experience_points,
        badge_url: formik.values.thumbnail,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback('Tier updated', 'success');
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
      title='Edit Tier'
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
        <Thumbnail
          imageValue={formik.values.thumbnail}
          setImageValue={(value) => formik.setFieldValue('thumbnail', value)}
        />
        <LabelInput formik={formik} name='name' label='Name' className='mb-4' />
        <TextArea
          formik={formik}
          name='description'
          label='Description'
          rows={3}
          className='mb-4'
        />
        <LabelInput
          formik={formik}
          name='needed_experience_points'
          label='Experience points needed'
          className='mb-4'
          type='number'
        />
      </div>
    </CustomModal>
  );
}

export default EditTierModal;
