import { useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { ProjectType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: ProjectType | undefined;
}

function DeleteProjectModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);

  const executeDelete = async () => {
    try {
      setLoading(true);
      await appAxios.delete(`/projects/admins/${selected?.id}`);
      closeModal();
      reload();
      sendFeedback('Project deleted', 'success');
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
      title='Delete Project'
      controls={
        <div className='flex items-center w-full justify-between flex-wrap gap-5'>
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
            className='!w-[190px] !h-10 !text-sm !bg-error'
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className='w-full text-center'>
        <p>
          Are you sure you want to delete: <b>{selected?.name}</b>
        </p>
      </div>
    </CustomModal>
  );
}

export default DeleteProjectModal;
