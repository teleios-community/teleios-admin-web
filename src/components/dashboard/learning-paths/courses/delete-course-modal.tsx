import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/button';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { LearningPathType } from '../../../../types/learning-path';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: LearningPathType | undefined;
}

function DeleteCourseModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();

  const executeDelete = async () => {
    try {
      setLoading(true);
      await appAxios.delete(
        `/curriculum/learning-paths/${params.id}/courses/${selected?.id}`
      );
      closeModal();
      reload();
      sendFeedback('Course removed', 'success');
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
      title='Remove Course'
      controls={
        <div className='flex items-center w-full justify-between flex-wrap'>
          <Button
            onClick={closeModal}
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
            color='outline'
          >
            Cancel
          </Button>
          <Button
            onClick={executeDelete}
            loading={loading}
            className='!w-[190px] !h-10 !text-sm bg-error'
          >
            Remove
          </Button>
        </div>
      }
    >
      <div className='w-full text-center'>
        <p>
          Are you sure you want to remove <b>{selected?.title} </b>from this learning path
        </p>
      </div>
    </CustomModal>
  );
}

export default DeleteCourseModal;
