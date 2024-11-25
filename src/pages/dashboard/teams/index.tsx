import { AddCircle, DocumentDownload } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import PageHeader from '../../../common/page-header';
import AllTeams from '../../../components/dashboard/teams/all-teams';
import TeamSuccessModal from '../../../components/dashboard/teams/team-success-modal';
import { sendCatchFeedback } from '../../../functions/feedback';
import { UserType } from '../../../types/user';

const AddTeamModal = lazy(
  () => import('../../../components/dashboard/teams/add-team-modal')
);
const DeleteTeamModal = lazy(
  () => import('../../../components/dashboard/teams/delete-team-modal')
);

const TeamsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<UserType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/admin/invites`);
      setAllData(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader
        pageTitle='Team Members'
        pageActions={
          <div className='flex items-center gap-3'>
            <Button onClick={() => setAddModal(true)}>
              <AddCircle />
              Invite Member
            </Button>
            <Button color='outline'>
              <DocumentDownload />
              Download List
            </Button>
          </div>
        }
      />
      <AllTeams
        allData={allData}
        loading={loading}
        setSelected={setSelected}
        setDeleteModal={setDeleteModal}
      />
      <AddTeamModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        openSuccessModal={() => setSuccessModal(true)}
      />
      <DeleteTeamModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        selectedUser={selected}
      />
      <TeamSuccessModal open={successModal} closeModal={() => setSuccessModal(false)} />
    </>
  );
};

export default TeamsPage;
