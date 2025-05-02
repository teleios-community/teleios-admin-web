import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../api/axios';
import Pagination from '../../../common/pagination';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';
import { ProjectSubmissionType } from '../../../types/data';

const SubmissionDetailsModal = lazy(
  () => import('../../../components/dashboard/projects-page/submission-details-modal')
);

const tableHeaders = [
  'user_first_name',
  'user_last_name',
  'status',
  'created_at',
  'repo_url',
  'mentor_comment',
  'tableAction',
];
const AllProjectSubmissions = () => {
  const params = useParams<{ id: string }>();
  const [detailsModal, setDetailsModal] = useState(false);
  const [selected, setSelected] = useState<ProjectSubmissionType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);

      // Find mentors
      const mentorResponse = await appAxios.get(
        `/projects/admins/${params.id}/user-submissions`
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
      <SubmissionDetailsModal
        closeModal={() => setDetailsModal(false)}
        open={detailsModal}
        selected={selected}
      />
    </>
  );
};

export default AllProjectSubmissions;
