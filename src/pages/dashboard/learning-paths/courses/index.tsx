import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Breadcrumb from '../../../../common/breadcrumb';
import Button from '../../../../common/button';
import LoadingIndicator from '../../../../common/loading-indicator';
import NoDataComponent from '../../../../common/no-data-component';
import PageHeader from '../../../../common/page-header';
import AllCourses from '../../../../components/dashboard/learning-paths/all-courses';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { LearningPathType } from '../../../../types/learning-path';

const AddCourseToPathModal = lazy(
  () => import('../../../../components/dashboard/learning-paths/add-course-to-path')
);

const LearningPathCoursesPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const params = useParams<{ id: string }>();
  const [pathDetails, setPathDetails] = useState<LearningPathType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/learning-paths?page=${page}&page_size=100`
      );

      // find specific learning path
      const allLearningPaths: LearningPathType[] = response.data.data.items;
      const foundLearningPath = allLearningPaths.find(
        (item) => item.id.toString() === params.id
      );

      if (!foundLearningPath)
        return sendFeedback('Could not find this learning path', 'error');

      setPathDetails(foundLearningPath);

      // Find courses under this learning path
      const courseResponse = await appAxios.get(
        `/curriculum/courses?page=${page}&page_size=100&learning_path_id=${foundLearningPath.id}`
      );

      setAllData(courseResponse.data.data.items);
      setTotalResults(courseResponse.data.data.total);
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
      <Breadcrumb links={['Learning paths', 'Product Design']} />
      <PageHeader
        pageTitle={loading ? 'Loading' : pathDetails?.title || 'Learning path'}
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddCircle />
            Add new course
          </Button>
        }
      />
      {loading ? (
        <LoadingIndicator />
      ) : allData && allData.length > 0 ? (
        <AllCourses
          allData={allData}
          loading={loading}
          page={page}
          setPage={setPage}
          totalResults={totalResults}
          // setSelected={setSelected}
          // setDeleteModal={setDeleteModal}
        />
      ) : (
        <NoDataComponent
          title='No Courses Yet'
          description='All courses added would appear here'
          buttonText='Add new course'
          onClickAction={() => setAddModal(true)}
        />
      )}

      <AddCourseToPathModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
    </>
  );
};

export default LearningPathCoursesPage;
