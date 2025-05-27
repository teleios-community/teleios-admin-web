import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { appAxios } from '../../../api/axios';
import CustomCard from '../../../common/custom-card';
import LoadingIndicator from '../../../common/loading-indicator';
import { sendCatchFeedback } from '../../../functions/feedback';
import { colors, renderCustomAxisTick } from './util';

const LearnersPerLearningPath = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    { count: number; learning_path: string }[] | undefined
  >(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get('/dashboard/admin/learners/learning-path');
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

  return (
    <CustomCard title='Users per learning path'>
      {loading ? (
        <LoadingIndicator />
      ) : data && data.length > 0 ? (
        <div style={{ height: 450 }}>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data}
              margin={{
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray='1 1' vertical={false} stroke='#F5F5F5' />
              <XAxis
                dataKey='learning_path'
                stroke='#999999'
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={renderCustomAxisTick}
              />
              <YAxis axisLine={false} tickLine={false} stroke='#999999' fontSize={14} />
              <Bar dataKey='count' radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <>No data found</>
      )}
    </CustomCard>
  );
};

export default LearnersPerLearningPath;
