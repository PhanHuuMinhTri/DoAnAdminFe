import React from "react";

import PrivateLayout from "../layouts/public/PrivateLayout";
import { ProtectedRoutes } from "./requiredAuth";

const HomeScreen = React.lazy(
  async () =>
    await import("../screens/privateScreens").then((module) => ({
      default: module.Dashboard,
    }))
);

const _privateRoutes = [
  {
    element: (
      <ProtectedRoutes>
        <PrivateLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        element: <HomeScreen />,
        path: "/dashboard",
      },
    ],
  },
];

export default _privateRoutes;
