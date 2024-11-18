import ErrorBoundaryLayout from 'components/error-boundary/layout';
import SuspenseLayout from 'components/suspense';
import { getTokenDetails } from 'functions/userSession';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from 'routes';
import { useAppDispatch } from 'store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenDetails();
    if (token) {
      // dispatch(updateToken({ token }));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: <ErrorBoundaryLayout />,
      errorElement: <NotFound />,
      children: [
        {
          element: <SuspenseLayout />,
          children: routes,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        style={{
          fontSize: 16,
          zIndex: 30,
        }}
        theme='colored'
        autoClose={5000}
        position='top-right'
        hideProgressBar={true}
        closeOnClick={true}
      />
    </>
  );
}

export default App;
