import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import PageHeader from '../../../common/page-header';
import AllLearningPaths from '../../../components/dashboard/learning-paths/all-learning-paths';
import { sendCatchFeedback } from '../../../functions/feedback';
import { LearningPathType } from '../../../types/learning-path';

// Flow Path
// Learning Paths > Courses > Sections > Lessons

const AddCourseToPathModal = lazy(
  () => import('../../../components/dashboard/learning-paths/add-learning-path-modal')
);
const DeleteLearningPathModal = lazy(
  () => import('../../../components/dashboard/learning-paths/delete-learning-path-modal')
);
const EditLearningPathModal = lazy(
  () => import('../../../components/dashboard/learning-paths/edit-learning-path-modal')
);

const LearningPathsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<LearningPathType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/curriculum/learning-paths?page=${page}`);
      setAllData(response.data.data.items);
      setTotalResults(response.data.data.total);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <PageHeader
        pageTitle='Learning paths'
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddCircle />
            Create new learning path
          </Button>
        }
      />
      <AllLearningPaths
        allData={allData}
        loading={loading}
        page={page}
        setPage={setPage}
        totalResults={totalResults}
        setSelected={setSelected}
        setDeleteModal={setDeleteModal}
        setEditModal={setEditModal}
      />
      <AddCourseToPathModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
      <DeleteLearningPathModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        selected={selected}
      />
      <EditLearningPathModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default LearningPathsPage;
