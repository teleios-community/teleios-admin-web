import { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import Pagination from '../../../common/pagination';
import SearchInput from '../../../common/search-input';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';
import { useDebounce } from '../../../hooks/useDebounce';
import { RoutePaths } from '../../../routes/route-paths';
import { AllLearnersType } from '../../../types/data';
import LearnerTotal from './learner-total';

const LearnerStatusModal = lazy(() => import('../learners-page/learner-status-modal'));
const SendNotificationModal = lazy(
  () => import('../learners-page/send-notification-modal')
);
const ResetUserPasswordModal = lazy(
  () => import('../learners-page/reset-user-password-modal')
);

const tableHeaders = [
  'email',
  'first_name',
  'last_name',
  'learning_path',
  'status',
  'created_at',
  'tableAction',
];
const AllLearners = () => {
  const navigate = useNavigate();
  const [statusModal, setStatusModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [selected, setSelected] = useState<AllLearnersType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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

      const response = await appAxios.get(
        `/learners/admin/users-list?${new URLSearchParams(queryParams).toString()}`
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
  }, [page, debouncedSearchQuery]);

  return (
    <>
      <LearnerTotal loading={loading} total={totalResults} />
      <div className='my-5'>
        <SearchInput
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder='Search by name, email or learning path'
        />
      </div>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data: AllLearnersType) => {
              navigate(`${RoutePaths.LEARNERS}/${data.id}`);
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
            label: 'Reset password',
            onClick: (data) => {
              setSelected(data);
              setPasswordModal(true);
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
      <ResetUserPasswordModal
        closeModal={() => setPasswordModal(false)}
        open={passwordModal}
        selected={selected}
      />
      <LearnerStatusModal
        closeModal={() => setStatusModal(false)}
        open={statusModal}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default AllLearners;
