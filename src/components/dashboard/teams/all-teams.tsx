import Table from 'common/table';
import { Dispatch, SetStateAction } from 'react';
import { UserType } from 'types/user';

const AllTeams = ({
  allData,
  loading,
  setSelected,
  setDeleteModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<UserType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const tableHeaders = ['email', 'role', 'created_at', 'used', 'tableAction'];

  return (
    <Table
      tableHeaders={tableHeaders}
      data={allData}
      loading={loading}
      menuItems={[
        // {
        //   label: 'Edit',
        //   onClick: (data) => {
        //     console.log(data);
        //     // setSelected(data);
        //     // setEditModal(true);
        //   },
        // },

        {
          label: 'Remove',
          onClick: (data) => {
            console.log(data);
            setSelected(data);
            setDeleteModal(true);
          },
          style: {
            color: 'var(--error)',
          },
        },
      ]}
    />
  );
};

export default AllTeams;
