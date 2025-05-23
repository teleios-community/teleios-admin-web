import PageHeader from '../../../common/page-header';
import AllLearners from '../../../components/dashboard/learners-page/all-learners';

const LearnersPage = () => {
  return (
    <div>
      <PageHeader pageTitle='Learners' />

      <AllLearners />
    </div>
  );
};

export default LearnersPage;
