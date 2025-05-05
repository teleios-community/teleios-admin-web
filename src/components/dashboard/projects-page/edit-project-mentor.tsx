import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Button from '../../../common/button';
import CustomCard from '../../../common/custom-card';
import Dropdown from '../../../common/drop-down';
import LoadingIndicator from '../../../common/loading-indicator';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { AssignedMentorType, MentorType, ProjectType } from '../../../types/data';

const EditProjectMentor = ({
  closeModal,
  project,
}: {
  closeModal: () => void;
  project: ProjectType;
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [mentors, setMentors] = useState<MentorType[] | undefined>(undefined);
  const [selectedMentors, setSelectedMentors] = useState<AssignedMentorType[]>([]);

  const getAllMentors = async () => {
    try {
      setFetchLoading(true);

      const response = await appAxios.get('/projects/admins/mentors/view-mentors');
      setMentors(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setFetchLoading(false);
    }
  };
  const getProjectMentors = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/projects/admins/mentors/view-mentors/${project.id}`
      );
      setSelectedMentors(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMentors();
    getProjectMentors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMentorToProject = async (mentorId: number) => {
    if (!mentorId) {
      return sendFeedback('Select a mentor', 'error');
    }
    try {
      setLoading(true);
      await appAxios.put('/projects/admins/mentors/assign-project', {
        project_id: project.id,
        mentor_id: mentorId,
      });

      const mentorDetails = mentors?.find((item) => item.id === mentorId);
      if (mentorDetails) {
        setSelectedMentors((old) => [...old, { ...mentorDetails, mentor_id: mentorId }]);
      }

      sendFeedback('Mentor assigned to project', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const removeMentorFromProject = async (mentorId: number) => {
    if (!mentorId) {
      return sendFeedback('Select a mentor', 'error');
    }
    try {
      setLoading(true);
      await appAxios.put('/projects/admins/mentors/assign-project', {
        project_id: project.id,
        mentor_id: mentorId,
      });

      const mentorDetails = mentors?.find((item) => item.id === mentorId);

      if (mentorDetails) {
        setSelectedMentors((old) => old.filter((item) => item.mentor_id !== mentorId));
      }

      sendFeedback('Mentor removed from project', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomCard
      title='Overview'
      controls={
        <div className='px-5 py-3 flex items-center justify-end w-full border-t-[#F0F2F5] border-t-[2px]'>
          <Button
            onClick={closeModal}
            disabled={loading}
            className='!w-[190px] !h-10 !text-sm'
          >
            Close
          </Button>
        </div>
      }
    >
      <div className='w-full flex flex-col gap-5'>
        <Dropdown
          options={mentors?.map((item) => ({
            label: item.first_name + ' ' + item.last_name,
            value: item.id,
          }))}
          name='mentors'
          onChange={(value) => {
            addMentorToProject(value.value);
          }}
          value={null}
          useFormik={false}
          placeholder='Choose mentors'
          label='Mentors'
          isLoading={fetchLoading}
        />

        {/* Selected Mentors */}
        {loading && <LoadingIndicator size={20} />}

        {selectedMentors.length > 0 ? (
          <div className='flex flex-wrap items-center gap-5 w-full'>
            {selectedMentors.map((mentor) => (
              <div
                className='bg-[#E9E9FF] px-[10px] py-2 w-fit flex items-center gap-2'
                key={mentor.id}
              >
                <span className='text-[#141414] font-medium text-sm'>
                  {mentor.first_name + ' ' + mentor.last_name}
                </span>
                <CloseCircle
                  onClick={() => removeMentorFromProject(mentor.mentor_id)}
                  color='#3B3B3B'
                  size={18}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className='text-sm'>No mentor has been assigned to this project</p>
          )
        )}
      </div>
    </CustomCard>
  );
};

export default EditProjectMentor;
