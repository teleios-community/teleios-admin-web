import CardInfo from '../../../../../common/card-info';
import { AllMentorsType } from '../../../../../types/data';
import EmptyInfo from '../empty-info';

const BioInfo = ({ user }: { user: AllMentorsType | undefined }) => {
  if (!user) return null;

  return (
    <CardInfo
      title='Bio'
      content={
        user?.bio ? (
          <p className='text-[#3B3B3B]'>{user?.bio}</p>
        ) : (
          <EmptyInfo title='No bio' description="Mentor hasn't entered a bio" />
        )
      }
    />
  );
};

export default BioInfo;
