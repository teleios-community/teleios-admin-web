import { useEffect, useState } from 'react';
import { appAxios } from '../../../../../api/axios';
import chart from '../../../../../assets/images/profile/chart.png';
import fire from '../../../../../assets/images/profile/fire.png';
import spark from '../../../../../assets/images/profile/spark.png';
import up from '../../../../../assets/images/profile/up.png';
import CardInfo from '../../../../../common/card-info';
import { sendCatchFeedback } from '../../../../../functions/feedback';
import { SpecificLearnerType, TierType } from '../../../../../types/data';

const LearningInfo = ({ user }: { user: SpecificLearnerType | undefined }) => {
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievementType, setAchievementType] = useState<TierType | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const xpResponse = await appAxios.get(
          `/learners/admin/specific-user/${user?.id}/accumulated-xp`
        );

        setXp(xpResponse.data.data.total_xp);
        setRank(xpResponse.data.data.rank);
        const streakResponse = await appAxios.get(
          `/learners/admin/specific-user/${user?.id}/streaks`
        );
        setStreak(streakResponse.data.data.current_streak);
        const achievementResponse = await appAxios.get(
          `/learners/admin/specific-user/${user?.id}/streaks`
        );

        if (achievementResponse.data.data && achievementResponse.data.data.length > 0) {
          setAchievementType(
            achievementResponse.data.data[
              (achievementResponse.data.data as []).length - 1
            ].tier
          );
        }
      } catch (error) {
        sendCatchFeedback(error);
      }
    };

    if (user) getData();
  }, [user]);

  if (!user) return null;

  return (
    <CardInfo
      title='Learning Statistics'
      content={
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          <div className='w-full flex flex-col items-center justify-center gap-2 border border-[#F0F2F5] shadow-sm p-6 rounded-md'>
            <div className='flex items-center gap-2 justify-center'>
              <img className='w-[16px] h-[16px]' src={fire} alt='note' />
              <p className='text-[#333333] font-semibold text-lg'>{streak ?? 0}</p>
            </div>
            <p className='text-[#626262] text-sm'> Daily Streak</p>
          </div>
          <div className=' w-full flex flex-col items-center justify-center gap-2 border border-[#F0F2F5] shadow-sm p-6 rounded-md'>
            <div className='flex items-center gap-2 justify-center'>
              <img className='w-[16px] h-[16px]' src={chart} alt='note' />
              <p className='text-[#333333] font-semibold text-lg'>{rank ?? 0}</p>
            </div>
            <p className='text-[#626262] text-sm'>Leaderboard Ranking</p>
          </div>
          <div className=' w-full flex flex-col items-center justify-center gap-2 border border-[#F0F2F5] shadow-sm p-6 rounded-md'>
            <div className='flex items-center gap-2 justify-center'>
              <img className='w-[16px] h-[16px]' src={spark} alt='note' />
              <p className='text-[#333333] font-semibold text-lg'>{xp ?? 0}</p>
            </div>
            <p className='text-[#626262] text-sm'>Experience Points (XP)</p>
          </div>

          <div className=' w-full flex flex-col items-center justify-center gap-2 border border-[#F0F2F5] shadow-sm p-6 rounded-md'>
            <div className='flex items-center gap-2 justify-center'>
              <img className='w-[16px] h-[16px]' src={up} alt='note' />
              <p className='text-[#333333] font-semibold text-lg'>
                {achievementType?.name ?? 'None yet'}
              </p>
            </div>
            <p className='text-[#626262] text-sm'>User level</p>
          </div>
        </div>
      }
    />
  );
};

export default LearningInfo;
