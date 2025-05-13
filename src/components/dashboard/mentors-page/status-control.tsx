import { Dispatch, SetStateAction } from 'react';

type StatusType = 'all' | 'active' | 'inactive';

const statuses: StatusType[] = ['all', 'active', 'inactive'];

const StatusControl = ({
  setStatus,
  status,
}: {
  status: StatusType;
  setStatus: Dispatch<SetStateAction<StatusType>>;
}) => {
  return (
    <div className='flex gap-3 items-center p-3 py-2 rounded-lg border border-[#E4E4E4] bg-white'>
      <span className='text-[#333333] text-sm'>Status:</span>
      <div className='flex items-center gap-3'>
        {statuses.map((item) => (
          <button
            onClick={() => setStatus(item)}
            key={item}
            className='px-3 py-1 border-[0.8px] rounded-[4px] duration-300 transition-colors cursor-pointer capitalize'
            style={{
              backgroundColor: status === item ? '#E9E9FF' : '#fff',
              borderColor: status === item ? '#293940' : '#ECECEC',
              color: status === item ? '#191A2F' : '#B1B1B1',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusControl;
