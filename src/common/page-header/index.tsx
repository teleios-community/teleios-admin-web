import React from 'react';
import BackComponent from '../back-component';

export interface PageHeaderProps {
  pageTitle: string;
  pageActions?: React.ReactNode;
  showBack?: boolean;
  destination?: string;
}

function PageHeader({ pageTitle, pageActions, showBack, destination }: PageHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-4 flex-wrap gap-2 py-5'>
      <div className='flex items-center gap-5 flex-wrap'>
        {showBack && (
          <BackComponent
            useDefaultBack={destination ? false : true}
            showText={false}
            destination={destination}
          />
        )}
        <h1 className='font-bold text-xl text-[#141414]'>{pageTitle}</h1>
      </div>

      {pageActions}
    </div>
  );
}

export default PageHeader;
