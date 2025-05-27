import { ArrowDown2, Calendar } from 'iconsax-react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { appAxios } from '../../../api/axios';
import CustomCard from '../../../common/custom-card';
import LoadingIndicator from '../../../common/loading-indicator';
import { sendCatchFeedback } from '../../../functions/feedback';
import { colors } from './util';

const CustomInput = ({ value, onClick }: any) => (
  <button
    className='border px-4 py-2 rounded-lg bg-white text-sm !font-normal flex items-center gap-2'
    onClick={onClick}
  >
    <Calendar size={18} color='#3F4052' />
    {value || 'Select Year'}
    <ArrowDown2 size={16} color='#3F4052' />
  </button>
);

const UserActivity = () => {
  const [selectedYear, setSelectedYear] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    { month: string; enrollments: number; active_learners: number }[] | undefined
  >(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const params: Record<string, string> = {};
      if (selectedYear) {
        params.year = selectedYear.getFullYear().toString();
      }

      const response = await appAxios.get(
        `/dashboard/admin/enrollments-active-learners`,
        { params }
      );

      const { months, enrollments, active_learners } = response.data.data;

      const formatted = months.map((month: string, i: number) => ({
        month,
        enrollments: enrollments[i],
        active_learners: active_learners[i],
      }));

      setData(formatted);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  return (
    <div className='mt-5'>
      <CustomCard
        title={
          <div className='flex items-center justify-between gap-5 flex-wrap'>
            <div className='flex items-center'>
              <p>User Activity</p>
              <div className='flex ml-4 gap-3 items-center'>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{
                      backgroundColor: colors[0],
                    }}
                  />
                  <span className='text-sm !font-normal text-[#3B3B3B]'>
                    Active learners
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{
                      backgroundColor: colors[1],
                    }}
                  />
                  <span className='text-sm !font-normal text-[#3B3B3B]'>
                    New enrollments
                  </span>
                </div>
              </div>
            </div>
            <div className='min-w-[120px]'>
              <DatePicker
                selected={selectedYear}
                onChange={(date) => setSelectedYear(date)}
                showYearPicker
                dateFormat='yyyy'
                customInput={<CustomInput />}
                className='border border-gray-300 rounded px-2 py-1 text-sm'
              />
            </div>
          </div>
        }
      >
        {loading ? (
          <LoadingIndicator />
        ) : data && data.length > 0 ? (
          <div style={{ height: 450 }}>
            <ResponsiveContainer height='100%' width='100%'>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id='colorActive' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor={colors[0]} stopOpacity={0.7} />
                    <stop offset='100%' stopColor={colors[0]} stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id='colorEnroll' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor={colors[1]} stopOpacity={0.7} />
                    <stop offset='100%' stopColor={colors[1]} stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey='month'
                  tickLine={false}
                  stroke='#999999'
                  tick={{ fontSize: 14 }}
                  dy={5}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke='#999999'
                  tick={{ fontSize: 14 }}
                />
                <CartesianGrid vertical={false} stroke='#EBEAEB' />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value,
                    name === 'active_learners' ? 'Active Learners' : 'New Enrollments',
                  ]}
                />
                <Area
                  type='monotone'
                  dataKey='active_learners'
                  stroke={colors[0]}
                  fill='url(#colorActive)'
                  strokeWidth={2}
                />
                <Area
                  type='monotone'
                  dataKey='enrollments'
                  stroke={colors[1]}
                  fill='url(#colorEnroll)'
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <>No data found</>
        )}
      </CustomCard>
    </div>
  );
};

export default UserActivity;
