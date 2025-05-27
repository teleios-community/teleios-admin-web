import LoadingIndicator from '../../../common/loading-indicator';

const LearnerTotal = ({ loading, total }: { total: number; loading: boolean }) => {
  return (
    <div className='charcoal-bg rounded-xl w-full min-h-[166px] px-primary py-5 text-center flex flex-col items-center justify-center gap-1'>
      <p className='text-[#D0D0D0] text-xl'>Total Learners</p>
      <span className='text-4xl font-bold text-white'>
        {loading ? <LoadingIndicator size={36} /> : total}
      </span>
    </div>
  );
};

export default LearnerTotal;
