import React from "react";

import { RequiredAuth } from "./requiredAuth";

const LoginScreen = React.lazy(
  async () =>
    await import("../screens/publicScreens").then((module) => ({
      default: module.LoginScreen,
    }))
);

const _publicRoutes = [
  {
    element: (
      <RequiredAuth>
        <LoginScreen />
      </RequiredAuth>
    ),
    path: "/",
  },
];

export default _publicRoutes;
