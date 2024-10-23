/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation
} from 'react-router-dom';
import Home from 'views/home';
import Ship2Viewer from 'views/ship';
import ErrorPage from './error-page';
import CanvasLayout from 'layout/CanvasLayout';
import AuthenticationController from 'auth';

export const paths = {
  home: '/',
  ship2: '/ship/:guid',
  others: '/*'
};

export default function AppRouterProvider() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: paths.ship2,
          element: (
            <RequireAuth>
              <CanvasLayout>
                <Ship2Viewer />
              </CanvasLayout>
            </RequireAuth>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = AuthenticationController.isLoggedIn();
  const currentLocation = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/"
      state={{
        from: currentLocation
      }}
    />
  );
}
