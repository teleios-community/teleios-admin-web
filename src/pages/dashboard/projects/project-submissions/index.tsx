import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Breadcrumb from '../../../../common/breadcrumb';
import PageHeader from '../../../../common/page-header';
import AllProjectSubmissions from '../../../../components/dashboard/projects-page/all-project-submissions';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { RoutePaths } from '../../../../routes/route-paths';
import { ProjectType } from '../../../../types/data';

const ProjectSubmissionsPage = () => {
  const [loading, setLoading] = useState(true);

  const params = useParams<{ id: string }>();
  const [pageDetails, setPageDetails] = useState<ProjectType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/projects/admins/${params.id}`);

      setPageDetails(response.data.data);
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
      <Breadcrumb
        links={[
          {
            label: 'Projects',
            link: RoutePaths.PROJECTS,
          },
          {
            label: loading ? '...' : pageDetails?.name || 'Submissions',
          },
        ]}
      />
      <PageHeader
        pageTitle={
          loading ? 'Loading' : `${pageDetails?.name ?? 'Project'} - Submissions`
        }
      />

      <AllProjectSubmissions />
    </>
  );
};

export default ProjectSubmissionsPage;
