import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import Button from '../../common/button';
import DashboardLayoutWithChildren from '../../layout/dashboard-layout/DashboardLayoutWithChildren';

const ErrorBoundary: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <DashboardLayoutWithChildren>
      <div
        role='alert'
        className='h-screen w-screen flex flex-col items-center justify-center text-BrandSecondary'
      >
        <p className='text-lg mb-2'>Something went wrong:</p>
        <p className='text-red-error mb-4'>{error?.message}</p>
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </div>
    </DashboardLayoutWithChildren>
  );
};

export default ErrorBoundary;
