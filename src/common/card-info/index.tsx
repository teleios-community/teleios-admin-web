import autoAnimate from '@formkit/auto-animate';
import { ArrowDown2 } from 'iconsax-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

const CardInfo = ({ content, title }: { title: string; content: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  return (
    <div className='w-full rounded-[8px] border-[1px] border-[#F0F2F5] bg-white shadow-sm'>
      <div
        className='flex items-center border-b-[1px] border-b-[#F0F2F5] w-full justify-between p-5 px-10 flex-wrap bg-white rounded-t-lg'
        onClick={() => setOpen(!open)}
      >
        <h3 className='text-black font-semibold text-lg'>{title}</h3>
        <ArrowDown2
          className='duration-300'
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </div>
      <div ref={parentRef}>{open && <div className='p-10'>{content}</div>}</div>
    </div>
  );
};

export default CardInfo;
