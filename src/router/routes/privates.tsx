/** @format */

import { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Dash from "../../pages/private/Dash";

export const PrivatesRoutesArray: RouteObject[] = [
  {
    path: "/dash",
    element: <Dash />,
  },
  {
    path: "*",
    element: <Navigate to="/dash" />,
  },
];

const PrivatesRoutes: FC = () => useRoutes(PrivatesRoutesArray);

export default PrivatesRoutes;
