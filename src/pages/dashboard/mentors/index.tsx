import PageHeader from '../../../common/page-header';
import AllMentors from '../../../components/dashboard/mentors-page/all-mentors';

const MentorsPage = () => {
  return (
    <div>
      <PageHeader pageTitle='Mentors' />

      <AllMentors />
    </div>
  );
};

export default MentorsPage;
