import { useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomModal from '../../../common/custom-modal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { UserType } from '../../../types/user';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  selectedUser: UserType | undefined;
}

function AddTeamModal({ closeModal, reload, open, selectedUser }: Props) {
  const [loading, setLoading] = useState(false);

  const submitValues = async () => {
    try {
      setLoading(true);
      await appAxios.delete(`/admin/invites/${selectedUser?.id}`);
      closeModal();
      reload();
      sendFeedback('Invite Deleted', 'success');
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
      title='Remove Team Member Invite'
      width='608px'
    >
      <p className='px-5 text-center'>
        Are you sure you want to delete this team member's invite?
      </p>
      <div className='w-full bg-[#F0F2F5] h-[1px] mt-5 mb-3' />

      <div className='flex items-center w-full justify-end gap-5 px-5'>
        <Button
          onClick={closeModal}
          disabled={loading}
          className='!w-[190px] !h-10 !text-sm'
          color='outline'
        >
          No, cancel
        </Button>
        <Button
          onClick={submitValues}
          loading={loading}
          className='!w-[190px] !h-10 !text-sm !bg-error'
        >
          Yes Remove
        </Button>
      </div>
    </CustomModal>
  );
}

export default AddTeamModal;
