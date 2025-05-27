import CardInfo from '../../../../../common/card-info';
import { SpecificLearnerType } from '../../../../../types/data';
import EmptyInfo from '../empty-info';

const BioInfo = ({ user }: { user: SpecificLearnerType | undefined }) => {
  if (!user) return null;

  return (
    <CardInfo
      title='Bio'
      content={
        user?.bio ? (
          <p className='text-[#3B3B3B]'>{user?.bio}</p>
        ) : (
          <EmptyInfo title='No bio' description="User hasn't entered a bio" />
        )
      }
    />
  );
};

export default BioInfo;
