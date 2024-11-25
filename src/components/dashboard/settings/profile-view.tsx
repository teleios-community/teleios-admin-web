import { Edit2 } from 'iconsax-react';
import { lazy, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import ProfileImageAndUpload from './profile-image-and-upload';
import ProfileInfo from './profile-info';

const EditProfileModal = lazy(() => import('./edit-profile-modal'));

const ProfileView = () => {
  const { user } = useAppSelector((state) => state.user);
  const [editModal, setEditModal] = useState(false);

  if (!user) return null;
  return (
    <>
      <div
        style={{
          boxShadow: '0px 4px 0px 0px #00000005 border-[#F0F2F5]  border',
        }}
        className='bg-white w-full rounded-lg'
      >
        <div className='rounded-t-lg px-10 py-5 border-b-[#F0F2F5] border-b flex items-center justify-between'>
          <span className='text-lg font-semibold text-[#141414]'>
            Personal Information
          </span>
          <button
            className='flex text-secondary items-center gap-2'
            onClick={() => setEditModal(true)}
          >
            Edit
            <div className='w-7 h-7 items-center flex justify-center border-secondary border rounded-full text-secondary'>
              <Edit2 size={16} />
            </div>
          </button>
        </div>
        <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-center'>
          {/*Image */}
          <ProfileImageAndUpload />

          <div className='flex flex-col gap-10'>
            <ProfileInfo label='First name' value={user.first_name} />
            <ProfileInfo label='Last name' value={user.last_name} />
          </div>
          <div className='flex flex-col gap-10'>
            <ProfileInfo label='Email' value={user.email} />
            <ProfileInfo label='Phone number' value={user.phone_number} />
          </div>
        </div>
      </div>
      <EditProfileModal open={editModal} closeModal={() => setEditModal(false)} />
    </>
  );
};

export default ProfileView;
