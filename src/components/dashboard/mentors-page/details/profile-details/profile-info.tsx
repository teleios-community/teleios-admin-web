import { ReactNode } from 'react';

const ProfileInfo = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[#939393] text-[15px]">{label}</span>
      <span className="text-[#333333] font-medium">
        {value || <span>-</span>}
      </span>
    </div>
  );
};

export default ProfileInfo;
