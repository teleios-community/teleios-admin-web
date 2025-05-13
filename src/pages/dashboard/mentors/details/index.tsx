import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../api/axios';
import Breadcrumb from '../../../../common/breadcrumb';
import Button from '../../../../common/button';
import PageHeader from '../../../../common/page-header';
import TabSwitch from '../../../../common/tab-switch';
import BioInfo from '../../../../components/dashboard/mentors-page/details/bio-info';
import MenteeReviews from '../../../../components/dashboard/mentors-page/details/mentee-reviews';
import MentorMentees from '../../../../components/dashboard/mentors-page/details/mentor-mentees';
import PersonalInfo from '../../../../components/dashboard/mentors-page/details/profile-details';
import MentorStatusModal from '../../../../components/dashboard/mentors-page/mentor-status-modal';
import SendNotificationModal from '../../../../components/dashboard/mentors-page/send-notification-modal';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { RoutePaths } from '../../../../routes/route-paths';
import { AllMentorsType } from '../../../../types/data';

const LearnerDetails = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>('Profile');
  const [statusModal, setStatusModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const params = useParams<{ id: string }>();
  const [pageDetails, setPageDetails] = useState<AllMentorsType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/mentors/admin/specific-mentor/${params.id}`);

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
            label: 'Mentors',
            link: RoutePaths.MENTORS,
          },
          {
            label: 'Mentor Information',
          },
        ]}
      />
      <PageHeader
        pageTitle={
          loading ? 'Loading' : pageDetails?.first_name + ' ' + pageDetails?.last_name
        }
      />

      <TabSwitch
        tabs={['Profile', 'Assigned students', "Mentees' reviews"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === 'Profile' && (
        <>
          <div className='flex flex-col gap-5'>
            <PersonalInfo user={pageDetails} />
            <BioInfo user={pageDetails} />
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
                color:
                  pageDetails?.status !== 'active' ? 'var(--primary)' : 'var(--error)',
              }}
            >
              {pageDetails?.status !== 'active' ? 'Activate' : 'Deactivate'} account
            </Button>
          </div>
        </>
      )}
      {selectedTab === 'Assigned students' && <MentorMentees />}
      {selectedTab === "Mentees' reviews" && <MenteeReviews />}

      <SendNotificationModal
        closeModal={() => setNotificationModal(false)}
        open={notificationModal}
        selected={pageDetails}
      />
      <MentorStatusModal
        closeModal={() => setStatusModal(false)}
        open={statusModal}
        reload={getData}
        selected={pageDetails}
      />
    </div>
  );
};

export default LearnerDetails;
