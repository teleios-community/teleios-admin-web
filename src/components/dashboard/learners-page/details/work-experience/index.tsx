import { Calendar, Location } from 'iconsax-react';
import { Fragment } from 'react';
import CardInfo from '../../../../../common/card-info';
import { getDateDifference } from '../../../../../functions/date';
import { convertSnakeCaseToPascal } from '../../../../../functions/stringManipulations';
import { SpecificLearnerType } from '../../../../../types/data';
import EmptyInfo from '../empty-info';
import { experienceColors } from './data';

const WorkExperienceList = ({ user }: { user: SpecificLearnerType | undefined }) => {
  if (!user) return null;

  return (
    <CardInfo
      title='Work Experience'
      content={
        user.work_experiences && user.work_experiences?.length > 0 ? (
          <div className='flex flex-col items-start w-full'>
            {user.work_experiences.map((experience, index) => {
              return (
                <Fragment key={experience.id}>
                  <div className='flex flex-col gap-3 w-full'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center justify-start gap-1 text-[15px] flex-wrap text-[#141414]'>
                        <p className='font-semibold'>{experience.position}</p>
                        <p className='text-[#3B3B3B] font-normal'>at</p>
                        <p className='font-semibold'>{experience.company}</p>
                      </div>
                    </div>
                    <div className='flex items-center w-full gap-2 text-sm text-[#141414]'>
                      <p className='capitalize'>
                        {convertSnakeCaseToPascal(experience.employment_type || '')}
                      </p>
                      <div className='flex items-center gap-1'>
                        <Calendar size={18} color='#292D32' />
                        <p>
                          {experience.start_date} -{' '}
                          {experience.end_date ? experience.end_date : 'Current'}
                          <span className='text-[#91999D]'>
                            {' '}
                            (
                            {getDateDifference(
                              experience.start_date,
                              experience.end_date || new Date().toDateString()
                            )}
                            )
                          </span>
                        </p>
                      </div>
                      <div className='flex items-center gap-1 text-sm'>
                        <Location color='#141414' size={18} />
                        <p>{experience.company_location}</p>
                        <p className='capitalize'> . {experience.location_type}</p>
                      </div>
                    </div>

                    <div>
                      <p className='text-[#939393] text-[15px]'>Sector</p>
                      <p className='text-sm text-[#141414] mt-1 font-medium'>
                        {experience.sector}
                      </p>
                    </div>
                    {experience.skills.length > 0 && (
                      <div>
                        <p className='text-[#939393] text-[15px] mb-1'>Skills</p>
                        <div className='flex items-center gap-2 flex-wrap'>
                          {experience.skills.map((skill: string, skillIndex: number) => (
                            <div
                              key={skillIndex}
                              className='text-[13px] flex items-center justify-center gap-2 font-medium text-[#141414] p-2 px-3 rounded-[24px]'
                              style={{
                                backgroundColor:
                                  experienceColors[skillIndex % experienceColors.length],
                              }}
                            >
                              {skill.replace(/[{}"]/g, '')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {index + 1 < user.work_experiences.length && (
                    <div className='border-b border-[#F0F2F5] w-full my-10' />
                  )}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <EmptyInfo
            title='Showcase your career journey.'
            description='Share your professional background and career achievements'
          />
        )
      }
    />
  );
};

export default WorkExperienceList;
