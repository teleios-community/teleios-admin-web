import Table from 'common/table';

const AllTeams = ({ allData, loading }: { allData: []; loading: boolean }) => {
  const tableHeaders = ['email', 'role', 'created_at', 'used_at', 'tableAction'];

  return (
    <Table
      tableHeaders={tableHeaders}
      data={allData}
      loading={loading}
      menuItems={[
        {
          label: 'Edit',
          onClick: (data) => {
            console.log(data);
            // setSelected(data);
            // setEditModal(true);
          },
        },

        {
          label: 'Remove',
          onClick: (data) => {
            console.log(data);
            // setSelected(data);
            // setDeleteModal(true);
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
