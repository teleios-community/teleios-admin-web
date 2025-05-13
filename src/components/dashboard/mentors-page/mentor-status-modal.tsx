import { useMemo, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { AllMentorsType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selected: AllMentorsType | undefined;
}

function MentorStatusModal({ closeModal, reload, open, selected }: Props) {
  const [loading, setLoading] = useState(false);

  const isActive = useMemo(() => selected?.status === 'active', [selected]);

  const executeDelete = async () => {
    try {
      setLoading(true);
      await appAxios.put(`/mentors/admin/specific-mentor/${selected?.id}`, {
        status: isActive ? 'inactive' : 'active',
      });
      closeModal();
      reload();
      sendFeedback(`Mentor ${isActive ? 'deactivated' : 'activated'}`, 'success');
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
      title={`${isActive ? 'Deactivate' : 'Activate'} Mentor`}
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
            className='!w-[190px] !h-10 !text-sm'
            style={{
              backgroundColor: isActive ? 'var(--error)' : 'var(--primary)',
            }}
          >
            Yes, {isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      }
    >
      <div className='w-full text-center'>
        <p>
          Are you sure you want to {isActive ? 'deactivate' : 'activate'}:{' '}
          <b>{selected?.first_name}</b>
        </p>
      </div>
    </CustomModal>
  );
}

export default MentorStatusModal;
