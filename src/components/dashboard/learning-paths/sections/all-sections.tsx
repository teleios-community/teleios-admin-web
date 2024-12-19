import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../../../common/table';
import { RoutePaths } from '../../../../routes/route-paths';
import { SectionType } from '../../../../types/learning-path';

const AllSections = ({
  allData,
  loading,
  setSelected,
  setDeleteModal,
  setEditModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<SectionType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const tableHeaders = ['title', 'is_free', 'description', 'created_at', 'tableAction'];
  const params = useParams<{ id: string }>();

  return (
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View quizzes',
            onClick: (data: SectionType) => {
              navigate(`${RoutePaths.SECTION_QUIZZES}/${params.id}/${data.id}`);
            },
          },
          {
            label: 'View lessons',
            onClick: (data: SectionType) => {
              navigate(`${RoutePaths.LEARNING_PATHS_LESSONS}/${params.id}/${data.id}`);
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
            onClick: (data: SectionType) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
          },
        ]}
      />
    </>
  );
};

export default AllSections;
