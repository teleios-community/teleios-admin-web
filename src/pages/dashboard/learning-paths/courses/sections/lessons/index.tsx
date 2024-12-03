import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../../../api/axios';
import Breadcrumb from '../../../../../../common/breadcrumb';
import Button from '../../../../../../common/button';
import LoadingIndicator from '../../../../../../common/loading-indicator';
import NoDataComponent from '../../../../../../common/no-data-component';
import PageHeader from '../../../../../../common/page-header';
import AllLessons from '../../../../../../components/dashboard/learning-paths/lessons/all-lessons';
import { sendCatchFeedback } from '../../../../../../functions/feedback';

const AddLessonToSection = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/lessons/add-lesson-to-section'
    )
);

const LearningPathLessonsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ courseId: string; sectionId: string }>();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/courses/${params.courseId}/sections/${params.sectionId}/lessons`
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
            Add new lesson
          </Button>
        }
      />
      {loading ? (
        <LoadingIndicator />
      ) : allData && allData.length > 0 ? (
        <AllLessons
          allData={allData}
          loading={loading}
          // setSelected={setSelected}
          // setDeleteModal={setDeleteModal}
        />
      ) : (
        <NoDataComponent
          title='No Lessons Yet'
          description='All lesson added would appear here'
          buttonText='Add new lesson'
          onClickAction={() => setAddModal(true)}
        />
      )}

      <AddLessonToSection
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
    </>
  );
};

export default LearningPathLessonsPage;
