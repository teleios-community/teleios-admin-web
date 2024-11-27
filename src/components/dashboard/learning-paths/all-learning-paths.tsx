import Table from '../../../common/table';

const AllLearningPaths = ({
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
  const tableHeaders = ['email', 'role', 'created_at', 'used', 'tableAction'];

  return (
    <Table
      tableHeaders={tableHeaders}
      data={allData}
      loading={loading}
      menuItems={
        [
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
  );
};

export default AllLearningPaths;
