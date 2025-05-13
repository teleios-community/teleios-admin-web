import React from 'react';
import CustomModal from '../../../../common/custom-modal/CustomModal';
import { formatDetailsValue } from '../../../../functions/details';
import { convertSnakeCaseToPascal } from '../../../../functions/stringManipulations';
import { MenteesType } from '../../../../types/data';

interface Props {
  closeModal: () => void;
  selected: MenteesType | undefined;
  open: boolean;
}

function MenteeDetailsModal({ closeModal, open, selected }: Props) {
  if (!selected) return null;
  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Project Details'
      width='608px'
    >
      {(Object.keys(selected) as Array<keyof MenteesType>).map((key) => (
        <React.Fragment key={String(key)}>
          <p className='flex items-start justify-between w-full flex-wrap text-sm'>
            <b className='uppercase'>{convertSnakeCaseToPascal(key)}:</b>{' '}
            <span>{formatDetailsValue(selected[key])}</span>
          </p>
          <div className='my-4 bg-gray-200 w-full h-[1px]' />
        </React.Fragment>
      ))}
    </CustomModal>
  );
}

export default MenteeDetailsModal;
