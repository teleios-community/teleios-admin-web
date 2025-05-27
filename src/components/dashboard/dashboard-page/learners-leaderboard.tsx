import { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import CustomCard from '../../../common/custom-card';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';

const LearnersLeaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[] | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get('/dashboard/admin/learners/leaderboard/global');
      setData(response.data.data.items);
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
    <div className='mt-5'>
      <CustomCard
        children={
          <Table
            data={data ?? []}
            loading={loading}
            tableHeaders={[
              'user_first_name',
              'user_last_name',
              'tier_name',
              'best_streak',
              'xp_earned',
              'user_last_project_completed_at',
            ]}
          />
        }
        disableChildPadding
        title="Learner's Leaderboard"
      />
    </div>
  );
};

export default LearnersLeaderboard;
