import behanceIcon from '../../../../../assets/icons/social/behance.svg';
import dribbbleIcon from '../../../../../assets/icons/social/dribbble.svg';
import githubIcon from '../../../../../assets/icons/social/github.svg';
import notionIcon from '../../../../../assets/icons/social/notion.svg';
import overflowIcon from '../../../../../assets/icons/social/stack-overflow.svg';
import CardInfo from '../../../../../common/card-info';
import { SpecificLearnerType } from '../../../../../types/data';

const socialPlatforms: { label: string; icon: string }[] = [
  {
    icon: behanceIcon,
    label: 'Behance',
  },
  {
    icon: dribbbleIcon,
    label: 'Dribbble',
  },
  {
    icon: githubIcon,
    label: 'Github',
  },
  {
    icon: notionIcon,
    label: 'Notion',
  },
  {
    icon: overflowIcon,
    label: 'Overflow',
  },
];

const SocialInfoForm = ({ user }: { user: SpecificLearnerType | undefined }) => {
  const platforms = socialPlatforms.map((platform) => {
    const identifiedSocial = user?.social_links.find(
      (item) => item.platform === platform.label
    );
    return {
      label: platform.label,
      icon: platform.icon,
      id: identifiedSocial?.id || '',
      value: identifiedSocial?.url || '',
    };
  });

  if (!user) return null;

  return (
    <CardInfo
      title='Social Media'
      content={
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {platforms.map((platform, index) => (
              <div
                key={platform.label}
                className='flex gap-3 items-center p-3 rounded-lg border border-[#EDEDED]'
              >
                <img src={platform.icon} alt={platform.label} />
                <input
                  type='url'
                  readOnly
                  className='w-full !outline-none !border-none'
                  value={platforms[index]?.value}
                  name={platform.label}
                />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default SocialInfoForm;
