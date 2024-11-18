import { Notification as NotificationIcon } from 'iconsax-react';
import { Link } from 'react-router-dom';

const Notification = () => {
  // const [allData, setAllData] = React.useState([]);

  // const getData = async () => {
  //   try {
  //     const response = await appAxios.post(`/all/notification`);
  //     setAllData(response.data?.data);
  //   } catch (error) {
  //     sendCatchFeedback(error);
  //   }
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  // const unreadNotifications = React.useMemo(() => {
  //   return allData.filter((data) => !data.isRead);
  // }, [allData]);
  return (
    <Link to='#' className='relative mr-[15px]'>
      <div className='w-[7px] h-[7px] bg-red-error rounded-full absolute right-[5px] top-0' />
      <NotificationIcon size={24} color='#876DFF' />
    </Link>
  );
};

export default Notification;
