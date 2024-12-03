import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ links }: { links: { label: string; link?: string }[] }) => {
  return (
    <div className='flex items-center gap-2 flex-wrap'>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {index < links.length - 1 ? (
            <Link to={link.link || ''} className='text-sm text-[#626262]'>
              {link.label}
            </Link>
          ) : (
            <span className='text-sm text-[#3B3B3B] font-semibold'>{link.label}</span>
          )}

          {index < links.length - 1 && <ArrowRight2 size={16} color='#626262' />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
