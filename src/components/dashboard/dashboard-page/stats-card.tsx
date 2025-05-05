import { People } from 'iconsax-react';

const StatsCard = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div
      className='border-[#F0F2F5] rounded-lg border w-full bg-white p-4'
      style={{
        boxShadow: '0px 4px 0px 0px #0F0F0F05',
      }}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-4'>
          <span className='text-[#6D6D6D] font-normal text-sm'>{label}</span>
          <span className='text-[#242424] font-bold text-2xl'>{value}</span>
        </div>
        <div className='w-8 h-8 rounded-full items-center flex justify-center border border-[#191A2F] bg-[#EFFAFF]'>
          <People color='#191A2F' />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
