import { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import LoadingIndicator from '../../../common/loading-indicator';
import { sendCatchFeedback } from '../../../functions/feedback';
import { DashboardSummary } from '../../../types/data';
import StatsCard from './stats-card';

const StatisticsSummary = () => {
  const [summary, setSummary] = useState<DashboardSummary | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await appAxios.get('/admin/dashboard/stats');
      setLoading(true);
      setSummary(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <LoadingIndicator />;

  if (!summary) return null;

  return (
    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard label='Total Learners' value={summary.user_stats.total_users} />
      <StatsCard label='Total Courses' value={summary.course_stats.total_courses} />
      <StatsCard
        label='Total Enrollments'
        value={summary.course_stats.total_enrollments}
      />
      <StatsCard
        label='Active Users (30 days)'
        value={summary.user_stats.active_users_last_30_days}
      />
    </div>
  );
};

export default StatisticsSummary;
