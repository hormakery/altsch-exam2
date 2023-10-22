import { Fragment } from "react";
import {
  Route,
  Outlet,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../../../assignment 1/src/pages/home";
import { useAuth } from "../../../assignment 1/src/hooks";
import Header from "../../../assignment 1/src/component/header";
import Repository from "../../../assignment 1/src/pages/repository";
import NotFound from "../../../assignment 1/src/pages/error_boundary";
import Repositories from "../../../assignment 1/src/pages/repositories";
import ErrorBoundary from "../../../assignment 1/src/pages/error_boundary";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Layout = () => (
  <Fragment>
    <Header />
    <Outlet />
  </Fragment>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/repositories"
          element={
            <ProtectedRoute>
              <Repositories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repositories/:repositoryId"
          element={
            <ProtectedRoute>
              <Repository />
            </ProtectedRoute>
          }
          // loader={({ params }) => {
          //   // of course you can use any data store
          //   // return fakeSdk.getTeam(params.gameId);
          // }}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Fragment>
  )
);

export default router;
