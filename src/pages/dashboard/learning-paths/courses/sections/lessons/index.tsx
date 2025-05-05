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
import { RoutePaths } from '../../../../../../routes/route-paths';
import { LessonType, SectionType } from '../../../../../../types/learning-path';

const AddLessonToSection = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/lessons/add-lesson-to-section'
    )
);
const DeleteLessonModal = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/lessons/delete-lesson-modal'
    )
);
const EditLessonModal = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/lessons/edit-lesson-modal'
    )
);

const LearningPathLessonsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ courseId: string; sectionId: string }>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<LessonType | undefined>(undefined);
  const [infoDetails, setInfoDetails] = useState<SectionType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/courses/${params.courseId}/sections/${params.sectionId}/lessons/admin`
      );

      setAllData(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const getInfoDetails = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/courses/${params.courseId}/sections/${params.sectionId}`
      );

      setInfoDetails(response.data.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          {
            label: 'Learning paths',
            link: RoutePaths.LEARNING_PATHS,
          },
          {
            label: loading ? '...' : infoDetails?.title || 'Section',
          },
        ]}
      />
      <PageHeader
        pageTitle={loading ? '...' : infoDetails?.title || 'Section'}
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
          setSelected={setSelected}
          setDeleteModal={setDeleteModal}
          setEditModal={setEditModal}
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

      <DeleteLessonModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        selected={selected}
      />
      <EditLessonModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default LearningPathLessonsPage;
