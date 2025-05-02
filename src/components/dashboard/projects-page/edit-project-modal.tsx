import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import CustomModal from '../../../common/custom-modal/CustomModal';
import { ProjectType } from '../../../types/data';
import { EditControlIcon } from '../../icons/project';
import EditProjectForm from './edit-project-form';
import EditProjectMentor from './edit-project-mentor';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  project: ProjectType | undefined;
}

function EditProjectModal({ closeModal, reload, open, project }: Props) {
  const [currentTab, setCurrentTab] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  if (!project) return null;

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Edit project'
      sideView={true}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full'>
        {/* Controls */}
        <div className='w-full border border-[#F0F2F5] rounded-xl bg-white h-fit'>
          <div className='flex flex-col'>
            {['Overview', 'Mentors'].map((control, index) => (
              <button
                className='relative pt-4 pr-4 text-left'
                onClick={() => setCurrentTab(index)}
                key={control}
              >
                {currentTab === index && (
                  <div className='absolute top-0 bottom-0 h-full flex items-center flex-col justify-center'>
                    <EditControlIcon />
                  </div>
                )}
                <p
                  style={{
                    color: currentTab === index ? 'var(--primary)' : '#91999D',
                  }}
                  className='pl-5 duration-300 transition-colors'
                >
                  {control}
                </p>

                {/* Divider */}
                <div className='p-4 pb-0 pr-0'>
                  {index + 1 < 2 && <div className='w-full bg-[#F0F2F5] h-[1px]' />}
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Viewer */}
        <div className='md:col-span-2' ref={parentRef}>
          {currentTab === 0 && (
            <EditProjectForm reload={reload} closeModal={closeModal} project={project} />
          )}
          {currentTab === 1 && (
            <EditProjectMentor closeModal={closeModal} project={project} />
          )}
        </div>
      </div>
    </CustomModal>
  );
}

export default EditProjectModal;
