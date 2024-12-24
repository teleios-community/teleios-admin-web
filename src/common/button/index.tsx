import { ButtonHTMLAttributes } from 'react';
import LoadingIndicator from '../loading-indicator';
import ProgressButton from './progress-button';

function Button({
  className,
  type = 'button',
  loading = false,
  onClick,
  children,
  color = 'primary',
  showProgress,
  progressTitle,
  progressValue,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  showProgress?: boolean;
  progressTitle?: string;
  progressValue?: number;
}) {
  return (
    <button
      type={type}
      className={
        (color === 'secondary'
          ? 'relative flex-wrap w-fit min-h-fit h-[48px] bg-secondary text-black rounded-lg px-4 hover:brightness-125 duration-300 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2'
          : color === 'primary'
          ? 'relative flex-wrap w-fit min-h-fit h-[48px] bg-primary text-white rounded-lg px-4 hover:brightness-125 duration-300 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2'
          : color === 'outline'
          ? 'relative flex-wrap w-fit min-h-fit h-[48px] bg-white border border-[#23343B] text-[#48565C] rounded-lg px-4 hover:brightness-125 duration-300 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2'
          : '') +
        ' ' +
        className
      }
      onClick={onClick}
      {...rest}
    >
      {showProgress && (
        <ProgressButton
          progressTitle={progressTitle}
          progressValue={progressValue}
          loading={loading}
        />
      )}
      {!showProgress && (loading ? <LoadingIndicator size={20} /> : children)}
    </button>
  );
}

export default Button;
