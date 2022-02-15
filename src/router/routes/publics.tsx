/** @format */

import { FC } from "react";
import { RouteObject, useRoutes, Navigate } from "react-router-dom";
import { Home } from "../../pages/public/Home";

export const PublicRoutesArray: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const PublicRoutes: FC = () => useRoutes(PublicRoutesArray);

export default PublicRoutes;
