'use client';

import CardInfo from '../../../../../common/card-info';
import { formatDate } from '../../../../../functions/date';
import { SpecificLearnerType } from '../../../../../types/data';
import ProfileInfo from './profile-info';

const PersonalInfo = ({ user }: { user: SpecificLearnerType | undefined }) => {
  if (!user) return null;
  return (
    <CardInfo
      title='Personal Information'
      content={
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10'>
          {/*Image */}
          <div className='w-[106px] h-[106px] rounded-full p-2 bg-[#F4CE9B] flex items-center justify-center relative'>
            <img
              src={user?.profile_picture_url}
              alt='user'
              width={100}
              height={100}
              className='w-full h-full object-cover rounded-full'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <ProfileInfo label='First name' value={user.first_name} />
            <ProfileInfo label='Last name' value={user.last_name} />
          </div>
          <div className='flex flex-col gap-5'>
            <ProfileInfo
              label='Learning Path'
              value={user.learning_path_details?.title}
            />
            <ProfileInfo label='Email' value={user.email} />
          </div>
          <div className='flex flex-col gap-5'>
            <ProfileInfo
              label='Gender'
              value={<span className='capitalize'>{user.gender}</span>}
            />
            <ProfileInfo label='Phone number' value={user.phone_number} />
          </div>
          <div className='flex flex-col gap-5'>
            <ProfileInfo label='Date Joined' value={formatDate(user.created_at)} />
          </div>
        </div>
      }
    />
  );
};

export default PersonalInfo;
