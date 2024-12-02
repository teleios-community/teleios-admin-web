import { ArrowRight2 } from 'iconsax-react';
import React from 'react';

const Breadcrumb = ({ links }: { links: string[] }) => {
  return (
    <div className='flex items-center gap-2'>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <span
            className={
              index < links.length - 1
                ? 'text-sm text-[#626262]'
                : 'text-sm text-[#3B3B3B] font-semibold'
            }
          >
            {link}
          </span>

          {index < links.length - 1 && <ArrowRight2 size={16} color='#626262' />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
