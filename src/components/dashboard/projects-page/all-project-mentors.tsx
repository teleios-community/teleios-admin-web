import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import Pagination from '../../../common/pagination';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';
import { MentorType } from '../../../types/data';

const MentorDetailsModal = lazy(
  () => import('../../../components/dashboard/projects-page/mentor-details-modal')
);

const tableHeaders = [
  'first_name',
  'last_name',
  'email',
  'status',
  'created_at',
  'tableAction',
];
const AllProjectMentors = () => {
  const params = useParams<{ id: string }>();
  const [detailsModal, setDetailsModal] = useState(false);
  const [selected, setSelected] = useState<MentorType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);

      // Find mentors
      const mentorResponse = await appAxios.get(
        `/projects/admins/mentors/view-mentors/${params.id}`
      );

      setAllData(mentorResponse.data.data.items);
      setTotalResults(mentorResponse.data.data.total);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data) => {
              setSelected(data);
              setDetailsModal(true);
            },
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      {/* Modals */}
      <MentorDetailsModal
        closeModal={() => setDetailsModal(false)}
        open={detailsModal}
        selected={selected}
      />
    </>
  );
};

export default AllProjectMentors;
