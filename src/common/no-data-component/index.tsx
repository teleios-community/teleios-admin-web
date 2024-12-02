import { AddCircle } from 'iconsax-react';
import NoDataIcon from '../../assets/icons/no-data.svg';
import Button from '../button';

const NoDataComponent = ({
  description,
  onClickAction,
  buttonText,
  title,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClickAction: () => void;
}) => {
  return (
    <div className='w-full py-20 flex items-center justify-center flex-col gap-10 text-center'>
      <img src={NoDataIcon} alt='No data found' />
      <div className='flex items-center text-center gap-1 flex-col'>
        <p className='text-primary font-semibold'>{title}</p>
        <span className='text-[#8A8A8A]'>{description}</span>
      </div>
      <Button onClick={onClickAction}>
        <AddCircle />
        {buttonText}
      </Button>
    </div>
  );
};

export default NoDataComponent;
