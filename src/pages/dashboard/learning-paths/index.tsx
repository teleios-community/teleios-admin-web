import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import PageHeader from '../../../common/page-header';
import AllLearningPaths from '../../../components/dashboard/learning-paths/all-learning-paths';
import { sendCatchFeedback } from '../../../functions/feedback';

const AddLearningPathModal = lazy(
  () => import('../../../components/dashboard/learning-paths/add-learning-path-modal')
);

const LearningPathsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/learning-paths?skip=${100}&limit=${20}`
      );
      setAllData(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
        // setSelected={setSelected}
        // setDeleteModal={setDeleteModal}
      />
      <AddLearningPathModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
    </>
  );
};

export default LearningPathsPage;
