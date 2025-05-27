import { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import CustomCard from '../../../common/custom-card';
import LabelInput from '../../../common/label-input/LabelInput';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';

const RecentActivity = () => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[] | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const response = await appAxios.get('/dashboard/admin/recent-activities', {
        params,
      });
      setData(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className='mt-5'>
      <CustomCard
        children={
          <Table
            data={data ?? []}
            loading={loading}
            tableHeaders={['message', 'created_at']}
          />
        }
        disableChildPadding
        title={
          <div className='flex items-center w-full justify-between'>
            <p>Recent Activities</p>
            <div className='flex items-center gap-2 !text-base !font-normal'>
              <LabelInput
                value={startDate}
                useFormik={false}
                onChange={(e) => setStartDate(e.target.value)}
                name='startDate'
                type='date'
              />
              <span>-</span>
              <LabelInput
                value={endDate}
                useFormik={false}
                onChange={(e) => setEndDate(e.target.value)}
                name='endDate'
                type='date'
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default RecentActivity;
