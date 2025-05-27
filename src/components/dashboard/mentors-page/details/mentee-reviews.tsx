import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import CustomCard from '../../../../common/custom-card';
import LoadingIndicator from '../../../../common/loading-indicator';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { ReviewType } from '../../../../types/data';

const MenteeReviews = () => {
  const [allData, setAllData] = useState<ReviewType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/mentors/admin/reviews/${params.id}`);

      setAllData(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-5 w-full'>
      {loading ? (
        <LoadingIndicator text='Fetching reviews' />
      ) : allData && allData.length > 0 ? (
        allData.map((data, index) => (
          <CustomCard
            key={index}
            title={
              <div className='flex items-center gap-3'>
                <div className='p-1 w-10 h-10 rounded-full bg-[#F4CE9B]'>
                  <img
                    src={data.user_profile_picture_url}
                    alt=''
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <span>
                  {data.user_first_name} {data.user_last_name}
                </span>
              </div>
            }
            children={data.review}
          />
        ))
      ) : (
        <>Mentor does not have any reviews</>
      )}
    </div>
  );
};

export default MenteeReviews;
