import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Breadcrumb from '../../../../common/breadcrumb';
import Button from '../../../../common/button';
import PageHeader from '../../../../common/page-header';
import BioInfo from '../../../../components/dashboard/learners-page/details/bio-info';
import LearningInfo from '../../../../components/dashboard/learners-page/details/learning-info';
import PersonalInfo from '../../../../components/dashboard/learners-page/details/profile-details';
import SocialInfoForm from '../../../../components/dashboard/learners-page/details/social-info';
import WorkExperienceList from '../../../../components/dashboard/learners-page/details/work-experience';
import LearnerStatusModal from '../../../../components/dashboard/learners-page/mentor-status-modal';
import SendNotificationModal from '../../../../components/dashboard/learners-page/send-notification-modal';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { RoutePaths } from '../../../../routes/route-paths';
import { SpecificLearnerType } from '../../../../types/data';

const LearnerDetails = () => {
  const [loading, setLoading] = useState(true);
  const [statusModal, setStatusModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const params = useParams<{ id: string }>();
  const [pageDetails, setPageDetails] = useState<SpecificLearnerType | undefined>(
    undefined
  );

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/learners/admin/specific-user/${params.id}`);

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
    <div>
      <Breadcrumb
        links={[
          {
            label: 'Learners',
            link: RoutePaths.LEARNERS,
          },
          {
            label: 'User Information',
          },
        ]}
      />
      <PageHeader
        pageTitle={
          loading ? 'Loading' : pageDetails?.first_name + ' ' + pageDetails?.last_name
        }
      />
      <div className='flex flex-col gap-5'>
        <PersonalInfo user={pageDetails} />
        <BioInfo user={pageDetails} />
        <LearningInfo user={pageDetails} />
        <WorkExperienceList user={pageDetails} />
        <SocialInfoForm user={pageDetails} />
      </div>

      <div className='mt-10 flex items-center justify-center w-full gap-5 px-primary flex-wrap md:flex-nowrap'>
        <Button className='w-full' onClick={() => setNotificationModal(true)}>
          Send notification
        </Button>
        <Button
          className='w-full'
          color='outline'
          onClick={() => setStatusModal(true)}
          style={{
            borderColor:
              pageDetails?.status !== 'active' ? 'var(--primary)' : 'var(--error)',
            color: pageDetails?.status !== 'active' ? 'var(--primary)' : 'var(--error)',
          }}
        >
          {pageDetails?.status !== 'active' ? 'Activate' : 'Deactivate'} account
        </Button>
      </div>

      <SendNotificationModal
        closeModal={() => setNotificationModal(false)}
        open={notificationModal}
        selected={pageDetails}
      />
      <LearnerStatusModal
        closeModal={() => setStatusModal(false)}
        open={statusModal}
        reload={getData}
        selected={pageDetails}
      />
    </div>
  );
};

export default LearnerDetails;
