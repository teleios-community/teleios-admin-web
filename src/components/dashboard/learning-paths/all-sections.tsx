import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../../common/table';
import { RoutePaths } from '../../../routes/route-paths';
import { SectionType } from '../../../types/learning-path';

const AllSections = ({
  allData,
  loading,
}: // setSelected,
// setDeleteModal,
{
  allData: [];
  loading: boolean;
  // setSelected: Dispatch<SetStateAction<UserType | undefined>>;
  // setDeleteModal: Dispatch<SetStateAction<boolean>>;
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
            label: 'View lessons',
            onClick: (data: SectionType) => {
              navigate(`${RoutePaths.LEARNING_PATHS_LESSONS}/${params.id}/${data.id}`);
              console.log(data);
              // setSelected(data);
              // setEditModal(true);
            },
          },
          // {
          //   label: 'Edit',
          //   onClick: (data) => {
          //     console.log(data);
          //     // setSelected(data);
          //     // setEditModal(true);
          //   },
          // },
          // {
          //   label: 'Remove',
          //   onClick: (data) => {
          //     console.log(data);
          //     setSelected(data);
          //     setDeleteModal(true);
          //   },
          //   style: {
          //     color: 'var(--error)',
          //   },
          // },
        ]}
      />
    </>
  );
};

export default AllSections;
