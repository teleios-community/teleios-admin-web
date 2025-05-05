import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import PageHeader from '../../../common/page-header';
import AllTiers from '../../../components/dashboard/tiers/all-tiers';
import { sendCatchFeedback } from '../../../functions/feedback';
import { TierType } from '../../../types/data';

const AddTierModal = lazy(
  () => import('../../../components/dashboard/tiers/add-tier-modal')
);
const DeleteTierModal = lazy(
  () => import('../../../components/dashboard/tiers/delete-tier-modal')
);
const EditTierModal = lazy(
  () => import('../../../components/dashboard/tiers/edit-tier-modal')
);
const TierDetailsModal = lazy(
  () => import('../../../components/dashboard/tiers/tier-details-modal')
);

const TiersPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<TierType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/tiers/?page=${page}`);
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
  }, [page]);

  return (
    <>
      <PageHeader
        pageTitle='Tiers'
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddCircle />
            Create new tier
          </Button>
        }
      />
      <AllTiers
        allData={allData}
        loading={loading}
        page={page}
        setPage={setPage}
        totalResults={totalResults}
        setSelected={setSelected}
        setDeleteModal={setDeleteModal}
        setEditModal={setEditModal}
        setDetailsModal={setDetailsModal}
      />
      <AddTierModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
      <DeleteTierModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        selected={selected}
      />
      <EditTierModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        selected={selected}
      />
      <TierDetailsModal
        open={detailsModal}
        closeModal={() => setDetailsModal(false)}
        selected={selected}
      />
    </>
  );
};

export default TiersPage;
