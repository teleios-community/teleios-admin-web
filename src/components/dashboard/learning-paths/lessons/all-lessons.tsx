import { Dispatch, SetStateAction } from 'react';
import Table from '../../../../common/table';
import { LessonType } from '../../../../types/learning-path';

const AllLessons = ({
  allData,
  loading,
  setSelected,
  setDeleteModal,
  setEditModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<LessonType | undefined>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const tableHeaders = [
    'title',
    'content_type',
    'content',
    'video_url',
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
            label: 'Edit overview',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
          },
          {
            label: 'Delete',
            onClick: (data: LessonType) => {
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

export default AllLessons;
