import { ReactNode } from 'react';

const CustomCard = ({
  controls,
  title,
  disableChildPadding,
  children,
}: {
  title: ReactNode;
  controls?: ReactNode;
  disableChildPadding?: boolean;
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
        <div
          style={{
            padding: disableChildPadding ? 0 : '28px 20px',
          }}
        >
          {children}
        </div>

        {controls && controls}
      </div>
    </div>
  );
};

export default CustomCard;
