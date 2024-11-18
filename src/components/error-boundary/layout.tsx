import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { default as ErrorBoundaryComponent } from '.';

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
    <Outlet />
  </ErrorBoundary>
);

export default ErrorBoundaryLayout;
