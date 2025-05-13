import { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import Pagination from '../../../common/pagination';
import SearchInput from '../../../common/search-input';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';
import { useDebounce } from '../../../hooks/useDebounce';
import { RoutePaths } from '../../../routes/route-paths';
import { AllMentorsType } from '../../../types/data';
import MentorTotal from './mentor-total';
import StatusControl from './status-control';

const MentorStatusModal = lazy(() => import('./mentor-status-modal'));
const SendNotificationModal = lazy(() => import('./send-notification-modal'));

const tableHeaders = [
  'first_name',
  'last_name',
  'email',
  'expertise_areas',
  'status',
  'created_at',
  'tableAction',
];
const AllMentors = () => {
  const navigate = useNavigate();
  const [statusModal, setStatusModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [selected, setSelected] = useState<AllMentorsType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const getData = async () => {
    try {
      setLoading(true);

      const queryParams: Record<string, string> = {
        page: String(page),
      };

      if (debouncedSearchQuery?.trim()) {
        queryParams.search = debouncedSearchQuery.trim();
      }

      if (status !== 'all') {
        queryParams.status = status;
      }

      const response = await appAxios.get(
        `/mentors/admin/mentors-list?${new URLSearchParams(queryParams).toString()}`
      );

      setAllData(response.data.data.items);
      setTotalResults(response.data.data.total);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchQuery, status]);

  return (
    <>
      <MentorTotal loading={loading} total={totalResults} />
      <div className='my-5 flex gap-5 w-full justify-between items-center'>
        <StatusControl status={status} setStatus={setStatus} />
        <SearchInput
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder='Search by name or expertise'
        />
      </div>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data: AllMentorsType) => {
              navigate(`${RoutePaths.MENTORS}/${data.id}`);
            },
          },
          {
            label: 'Send notification',
            onClick: (data) => {
              setSelected(data);
              setNotificationModal(true);
            },
          },
          {
            label: 'Change profile status',
            onClick: (data) => {
              setSelected(data);
              setStatusModal(true);
            },
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      {/* Modals */}

      <SendNotificationModal
        closeModal={() => setNotificationModal(false)}
        open={notificationModal}
        selected={selected}
      />

      <MentorStatusModal
        closeModal={() => setStatusModal(false)}
        open={statusModal}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default AllMentors;
