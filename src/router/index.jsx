import { Fragment } from "react";
import {
  Route,
  Outlet,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../pages/home";
import { useAuth } from "../hooks";
import Header from "../component/header";
import Repository from "../pages/repository";
import NotFound from "../pages/error_boundary";
import Repositories from "../pages/repositories";
import ErrorBoundary from "../pages/error_boundary";

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
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Fragment>
  )
);

export default router;
