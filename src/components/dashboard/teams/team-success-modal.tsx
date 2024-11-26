import OpenMailGif from '../../../assets/images/open-mail.gif';
import CustomModal from '../../../common/custom-modal/CustomModal';

interface Props {
  closeModal: () => void;
  open: boolean;
}

function TeamSuccessModal({ closeModal, open }: Props) {
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='' width='524px'>
      <div className='flex flex-col items-center text-center'>
        <img src={OpenMailGif} alt='Successful...' className='object-contain w-60 ' />
        <p className='font-semibold text-lg'>Invitation sent successfully</p>
        <span className='font-normal text-[#3B3B3B] text-[13px] max-w-[412px] mt-2'>
          The admin invitation email has been sent and the recipient would be notified
          shortly.
        </span>
      </div>
    </CustomModal>
  );
}

export default TeamSuccessModal;
