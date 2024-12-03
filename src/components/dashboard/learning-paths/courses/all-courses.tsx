import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../common/pagination';
import Table from '../../../../common/table';
import { RoutePaths } from '../../../../routes/route-paths';
import { CourseType } from '../../../../types/learning-path';

const AllCourses = ({
  allData,
  loading,
  page,
  setPage,
  totalResults,
  setSelected,
  setDeleteModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<CourseType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
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
            label: 'View sections',
            onClick: (data: CourseType) => {
              navigate(`${RoutePaths.LEARNING_PATHS_SECTIONS}/${data.id}`);
            },
          },
          {
            label: 'Remove course',
            onClick: (data) => {
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

export default AllCourses;
