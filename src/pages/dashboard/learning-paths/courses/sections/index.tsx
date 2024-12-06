import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../../api/axios';
import Breadcrumb from '../../../../../common/breadcrumb';
import Button from '../../../../../common/button';
import LoadingIndicator from '../../../../../common/loading-indicator';
import NoDataComponent from '../../../../../common/no-data-component';
import PageHeader from '../../../../../common/page-header';
import AllSections from '../../../../../components/dashboard/learning-paths/sections/all-sections';
import { sendCatchFeedback } from '../../../../../functions/feedback';
import { RoutePaths } from '../../../../../routes/route-paths';
import { CourseType, SectionType } from '../../../../../types/learning-path';

const AddSectionToCourseModal = lazy(
  () =>
    import(
      '../../../../../components/dashboard/learning-paths/sections/add-section-to-course-modal'
    )
);

const EditSectionModal = lazy(
  () =>
    import(
      '../../../../../components/dashboard/learning-paths/sections/edit-section-modal'
    )
);

const DeleteSectionModal = lazy(
  () =>
    import(
      '../../../../../components/dashboard/learning-paths/sections/delete-section-modal'
    )
);

const LearningPathSectionsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const [infoDetails, setInfoDetails] = useState<CourseType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<SectionType | undefined>(undefined);

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

  const getInfoDetails = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/curriculum/courses/${params.id}`);

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
            label: loading ? '...' : infoDetails?.title || 'Course',
          },
        ]}
      />
      <PageHeader
        pageTitle={loading ? '...' : infoDetails?.title || 'Course'}
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
          setSelected={setSelected}
          setDeleteModal={setDeleteModal}
          setEditModal={setEditModal}
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

      <DeleteSectionModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        selected={selected}
      />
      <EditSectionModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default LearningPathSectionsPage;
