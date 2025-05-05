import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import CameraIcon from '../../assets/icons/camera.svg';
import DefaultImage from '../../assets/images/default-profile-image.svg';
import { firebaseApp } from '../../config/firebaseConfig';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../loading-indicator';

const Thumbnail = ({
  imageValue,
  setImageValue,
}: {
  imageValue: string;
  setImageValue: (value: string) => void;
}) => {
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setLoading(true);

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, 'images/' + (file.name + new Date().getTime()));
      const snapshot = await uploadBytes(storageRef, file);

      const fileDownloadUrl = await getDownloadURL(snapshot.ref);

      setImageValue(fileDownloadUrl);
      if (thumbnailRef.current) {
        thumbnailRef.current.value = '';
      }
    } catch (error) {
      if (thumbnailRef.current) {
        thumbnailRef.current.value = '';
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
          className='bg-[#191A2F] cursor-pointer w-6 h-6 rounded-full absolute bottom-2 -right-1 flex items-center justify-center'
          onClick={() => thumbnailRef.current?.click()}
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
          name='thumbnail'
          id='thumbnail'
          ref={thumbnailRef}
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

export default Thumbnail;
