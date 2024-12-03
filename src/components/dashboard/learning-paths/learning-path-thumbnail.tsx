import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import CameraIcon from '../../../assets/icons/camera.svg';
import DefaultImage from '../../../assets/images/default-profile-image.svg';
import LoadingIndicator from '../../../common/loading-indicator';
import { firebaseApp } from '../../../config/firebaseConfig';
import { sendCatchFeedback } from '../../../functions/feedback';
const LearningPathThumbnail = ({
  imageValue,
  setImageValue,
}: {
  imageValue: string;
  setImageValue: (value: string) => void;
}) => {
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setLoading(true);

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, 'images/' + (file.name + new Date().getTime()));
      const snapshot = await uploadBytes(storageRef, file);

      const fileDownloadUrl = await getDownloadURL(snapshot.ref);

      setImageValue(fileDownloadUrl);
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

  return (
    <div className='mb-4'>
      <p className='text-lg font-bold'>Thumbnail</p>
      <div className='w-[106px] h-[106px] rounded-full p-2 bg-[#F4CE9B] flex items-center justify-center relative'>
        <img
          src={imageValue || DefaultImage}
          alt='user'
          className='w-full h-full object-cover rounded-full'
        />
        <button
          className='bg-[#23343B] cursor-pointer w-6 h-6 rounded-full absolute bottom-2 -right-1 flex items-center justify-center'
          onClick={() => avatarFileRef.current?.click()}
          disabled={loading}
        >
          {loading ? (
            <LoadingIndicator size={16} />
          ) : (
            <img src={CameraIcon} alt='Upload' />
          )}
        </button>
        <input
          type='file'
          name='userAvatar'
          id='userAvatar'
          ref={avatarFileRef}
          onChange={(e) => {
            if (e.target.files) {
              uploadImage(e.target.files[0]);
            }
          }}
          hidden
          accept='image/*'
        />
      </div>
    </div>
  );
};

export default LearningPathThumbnail;
