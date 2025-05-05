import { ReactNode } from 'react';

const CustomCard = ({
  controls,
  title,
  children,
}: {
  title: string;
  controls?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className='bg-white border-[2px] border-[#F0F2F5] rounded-xl'>
      {/* Title */}
      <div className='border-t-xl p-5 border-b-[#F0F2F5] border-b-[2px] text-[#141414] font-bold text-lg'>
        {title}
      </div>

      {/* Body */}
      <div>
        <div className='py-7 px-5'>{children}</div>

        {controls && controls}
      </div>
    </div>
  );
};

export default CustomCard;
