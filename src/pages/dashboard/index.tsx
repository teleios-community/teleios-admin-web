import LearnersLeaderboard from '../../components/dashboard/dashboard-page/learners-leaderboard';
import LearnersPerLearningPath from '../../components/dashboard/dashboard-page/learners-per-learning-path';
import MentorsCount from '../../components/dashboard/dashboard-page/mentors-count';
import RecentActivity from '../../components/dashboard/dashboard-page/recent-activity';
import StatisticsSummary from '../../components/dashboard/dashboard-page/statistics-summary';
import UserActivity from '../../components/dashboard/dashboard-page/user-activity';

const DashboardPage = () => {
  return (
    <>
      <StatisticsSummary />
      <UserActivity />
      <LearnersLeaderboard />
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <MentorsCount />
        <LearnersPerLearningPath />
      </div>
      <RecentActivity />
    </>
  );
};

export default DashboardPage;
