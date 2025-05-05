import { Dispatch, SetStateAction } from 'react';
import Pagination from '../../../common/pagination';
import Table from '../../../common/table';
import { TierType } from '../../../types/data';

const AllTiers = ({
  allData,
  loading,
  page,
  setPage,
  totalResults,
  setSelected,
  setDeleteModal,
  setEditModal,
  setDetailsModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<TierType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setDetailsModal: Dispatch<SetStateAction<boolean>>;
  page: number;
  totalResults: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const tableHeaders = [
    'name',
    'description',
    'needed_experience_points',
    'created_at',
    'tableAction',
  ];

  return (
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data: TierType) => {
              setSelected(data);
              setDetailsModal(true);
            },
          },
          {
            label: 'Edit tier',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
          },
          {
            label: 'Delete tier',
            onClick: (data: TierType) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
    </>
  );
};

export default AllTiers;
