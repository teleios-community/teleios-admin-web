import ErrorBoundaryLayout from 'components/error-boundary/layout';
import SuspenseLayout from 'components/suspense';
import { getSessionDetails, getTokenDetails } from 'functions/userSession';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from 'routes';
import { useAppDispatch } from 'store/hooks';
import { updateToken, updateUser } from 'store/slices/user';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenDetails();
    const user = getSessionDetails();
    if (token) {
      dispatch(updateToken({ token }));
    }
    if (user) {
      dispatch(
        updateUser({
          user,
        })
      );
    }
  }, [dispatch]);

  const router = createBrowserRouter(
    [
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
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
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
