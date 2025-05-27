import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { appAxios } from '../../../api/axios';
import CustomCard from '../../../common/custom-card';
import LoadingIndicator from '../../../common/loading-indicator';
import { sendCatchFeedback } from '../../../functions/feedback';
import { colors } from './util';

type MentorData = {
  mentors_count: number;
  active_mentors: number;
  inactive_mentors: number;
};

const MentorsCount = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MentorData | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get('/dashboard/admin/mentors-count/by-activity');
      setData(response.data.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Transform to pie chart data format
  const pieData = data
    ? [
        { name: 'Active', value: data.active_mentors },
        { name: 'Inactive', value: data.inactive_mentors },
      ]
    : [];

  return (
    <CustomCard title='Mentors'>
      {loading ? (
        <LoadingIndicator />
      ) : pieData.length > 0 ? (
        <>
          <div style={{ height: 400 }} className='relative'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={150}
                  fill='#8884d8'
                  // paddingAngle={5}
                  dataKey='value'
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  labelLine={false}
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='absolute top-0 right-0 left-0 bottom-0'>
              <div className='flex items-center justify-center gap-1 flex-col h-full'>
                <p className='text-sm'>Total</p>
                <p className='text-[28px] font-semibold'>{data?.mentors_count ?? 0}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between flex-col gap-3'>
            <div className='flex items-center gap-1'>
              <div
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor: colors[0],
                }}
              />
              <span className='text-sm'>
                Active mentors: <b>{data && data.active_mentors}</b>
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <div
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor: colors[1],
                }}
              />
              <span className='text-sm'>
                Inactive mentors: <b>{data && data.inactive_mentors}</b>
              </span>
            </div>
          </div>
        </>
      ) : (
        <>No data found</>
      )}
    </CustomCard>
  );
};

export default MentorsCount;
