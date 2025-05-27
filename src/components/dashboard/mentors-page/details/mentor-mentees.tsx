import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Table from '../../../../common/table';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { MenteesType } from '../../../../types/data';

const MenteeDetailsModal = lazy(() => import('./mentee-details-modal'));

const tableHeaders = [
  'first_name',
  'last_name',
  'learning_path',
  'email',
  'project_count',
  'tableAction',
];
const MentorMentees = () => {
  const [detailsModal, setDetailsModal] = useState(false);
  const [selected, setSelected] = useState<MenteesType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/mentors/admin/mentor-mentees/${params.id}`);

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
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data: MenteesType) => {
              setSelected(data);
              setDetailsModal(true);
            },
          },
        ]}
      />

      {/* Modals */}

      <MenteeDetailsModal
        closeModal={() => setDetailsModal(false)}
        open={detailsModal}
        selected={selected}
      />
    </>
  );
};

export default MentorMentees;
