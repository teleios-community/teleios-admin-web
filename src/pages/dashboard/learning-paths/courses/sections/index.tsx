import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../../api/axios';
import Breadcrumb from '../../../../../common/breadcrumb';
import Button from '../../../../../common/button';
import LoadingIndicator from '../../../../../common/loading-indicator';
import NoDataComponent from '../../../../../common/no-data-component';
import PageHeader from '../../../../../common/page-header';
import AllSections from '../../../../../components/dashboard/learning-paths/all-sections';
import { sendCatchFeedback } from '../../../../../functions/feedback';

const AddSectionToCourseModal = lazy(
  () =>
    import(
      '../../../../../components/dashboard/learning-paths/add-section-to-course-modal'
    )
);

const LearningPathSectionsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/curriculum/courses/${params.id}/sections`);

      setAllData(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb links={['Learning paths', 'Product Design']} />
      <PageHeader
        pageTitle={''}
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddCircle />
            Add new section
          </Button>
        }
      />
      {loading ? (
        <LoadingIndicator />
      ) : allData && allData.length > 0 ? (
        <AllSections
          allData={allData}
          loading={loading}
          // setSelected={setSelected}
          // setDeleteModal={setDeleteModal}
        />
      ) : (
        <NoDataComponent
          title='No Sections Yet'
          description='All sections added would appear here'
          buttonText='Add new section'
          onClickAction={() => setAddModal(true)}
        />
      )}

      <AddSectionToCourseModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
    </>
  );
};

export default LearningPathSectionsPage;
