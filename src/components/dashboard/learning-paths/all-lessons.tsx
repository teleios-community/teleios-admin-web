import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../../common/table';

const AllLessons = ({
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
  const tableHeaders = ['title', 'content_type', 'content', 'created_at', 'tableAction'];
  const params = useParams<{ courseId: string; sectionId: string }>();

  return (
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={
          [
            // {
            //   label: 'View lessons',
            //   onClick: (data: SectionType) => {
            //     navigate(`${RoutePaths.LEARNING_PATHS_LESSONS}/${params.id}/${data.id}`);
            //     console.log(data);
            //     // setSelected(data);
            //     // setEditModal(true);
            //   },
            // },
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
          ]
        }
      />
    </>
  );
};

export default AllLessons;
