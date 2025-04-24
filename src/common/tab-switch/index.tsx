import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const TabSwitch = ({
  tabs,
  setSelectedTab,
  selectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ScrollContainer className='mb-8 flex items-center w-full max-w-full no-scroll-bar overflow-x-auto text-[#8A8A8A] text-sm font-normal gap-3 border-b border-b-[#EBEBEB]'>
      {tabs.map((tab) =>
        tab === selectedTab ? (
          <button
            key={tab}
            className='text-[#191A2F] duration-300 pb-2 px-3 border-b-[2px] border-b-primary font-semibold transition-colors'
          >
            {tab}
          </button>
        ) : (
          <button
            key={tab}
            className='duration-300 pb-2 px-3 transition-colors'
            onClick={() => {
              setSelectedTab(tab);
            }}
          >
            {tab}
          </button>
        )
      )}
    </ScrollContainer>
  );
};

export default TabSwitch;
