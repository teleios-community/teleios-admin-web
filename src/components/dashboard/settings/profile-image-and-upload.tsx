import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import { appAxios } from '../../../api/axios';
import CameraIcon from '../../../assets/icons/camera.svg';
import DefaultImage from '../../../assets/images/default-profile-image.svg';
import LoadingIndicator from '../../../common/loading-indicator';
import { firebaseApp } from '../../../config/firebaseConfig';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateUser } from '../../../store/slices/user';
import { UserType } from '../../../types/user';

const ProfileImageAndUpload = () => {
  const { user } = useAppSelector((state) => state.user);
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const uploadProfileImage = async (file: File) => {
    try {
      setLoading(true);

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, 'images/' + (file.name + new Date().getTime()));
      const snapshot = await uploadBytes(storageRef, file);

      const fileDownloadUrl = await getDownloadURL(snapshot.ref);

      await appAxios.put('/users/profile', {
        profile_picture_url: fileDownloadUrl,
      });
      sendFeedback('Profile Image Uploaded', 'success');
      dispatch(
        updateUser({
          user: {
            ...user,
            profile_picture_url: fileDownloadUrl,
          } as UserType,
        })
      );
      if (avatarFileRef.current) {
        avatarFileRef.current.value = '';
      }
    } catch (error) {
      if (avatarFileRef.current) {
        avatarFileRef.current.value = '';
      }

      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  if (!user) return null;
  return (
    <div className='w-[106px] h-[106px] rounded-full p-2 bg-[#F4CE9B] flex items-center justify-center relative'>
      <img
        src={user?.profile_picture_url || DefaultImage}
        alt='user'
        className='w-full h-full object-contain rounded-full'
      />
      <button
        className='bg-[#23343B] cursor-pointer w-6 h-6 rounded-full absolute bottom-2 -right-1 flex items-center justify-center'
        onClick={() => avatarFileRef.current?.click()}
        disabled={loading}
      >
        {loading ? <LoadingIndicator size={16} /> : <img src={CameraIcon} alt='Upload' />}
      </button>
      <input
        type='file'
        name='userAvatar'
        id='userAvatar'
        ref={avatarFileRef}
        onChange={(e) => {
          if (e.target.files) {
            uploadProfileImage(e.target.files[0]);
          }
        }}
        hidden
        accept='image/*'
      />
    </div>
  );
};

export default ProfileImageAndUpload;
