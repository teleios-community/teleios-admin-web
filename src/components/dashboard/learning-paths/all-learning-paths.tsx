import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../common/pagination';
import Table from '../../../common/table';
import { RoutePaths } from '../../../routes/route-paths';
import { LearningPathType } from '../../../types/learning-path';

const AllLearningPaths = ({
  allData,
  loading,
  page,
  setPage,
  totalResults,
  setSelected,
  setDeleteModal,
  setEditModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<LearningPathType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  page: number;
  totalResults: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  const tableHeaders = [
    'title',
    'difficulty_level',
    'status',
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
            label: 'View courses',
            onClick: (data: LearningPathType) => {
              navigate(`${RoutePaths.LEARNING_PATHS_COURSES}/${data.id}`);
            },
          },
          {
            label: 'Edit overview',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
          },
          {
            label: 'Delete',
            onClick: (data: LearningPathType) => {
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

export default AllLearningPaths;
