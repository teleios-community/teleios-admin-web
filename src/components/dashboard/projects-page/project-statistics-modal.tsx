import React, { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import CustomModal from '../../../common/custom-modal/CustomModal';
import LoadingIndicator from '../../../common/loading-indicator';
import { formatDetailsValue } from '../../../functions/details';
import { sendCatchFeedback } from '../../../functions/feedback';
import { convertSnakeCaseToPascal } from '../../../functions/stringManipulations';
import { ProjectStatisticsType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  projectId: number | undefined;
}

function ProjectStatisticsModal({ closeModal, open, projectId }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProjectStatisticsType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      // Find mentors
      const mentorResponse = await appAxios.get(
        `/projects/admins/${projectId}/statistics`
      );

      setData(mentorResponse.data.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (projectId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Project Statistics'
      width='608px'
    >
      {loading ? (
        <LoadingIndicator />
      ) : data ? (
        (Object.keys(data) as Array<keyof ProjectStatisticsType>).map((key) => (
          <React.Fragment key={String(key)}>
            <p className='flex items-start justify-between w-full flex-wrap text-sm'>
              <b className='uppercase'>{convertSnakeCaseToPascal(key)}:</b>{' '}
              <span>{formatDetailsValue(data[key])}</span>
            </p>
            <div className='my-4 bg-gray-200 w-full h-[1px]' />
          </React.Fragment>
        ))
      ) : (
        <>No data found</>
      )}
    </CustomModal>
  );
}

export default ProjectStatisticsModal;
