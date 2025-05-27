import { ReactNode } from 'react';
import EmptyImage from '../../../../assets/images/profile/empty-info.svg';

const EmptyInfo = ({
  description,
  title,
  control,
}: {
  title: string;
  description: string;
  control?: ReactNode;
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={EmptyImage} alt='empty' />
      <p className='text-[#23343B] font-semibold mt-5'>{title}</p>
      <p className='text-[#8A8A8A] text-sm'>{description}</p>
      {control}
    </div>
  );
};

export default EmptyInfo;
