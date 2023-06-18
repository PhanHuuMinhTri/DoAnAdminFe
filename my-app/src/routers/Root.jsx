import React from "react";
import { useRoutes } from "react-router-dom";

import _publicRoutes from "./_public";
import _privateRoutes from "./_private";
import _globalRoutes from "./_global";

export const RootRouter = () => {
  const totalRootes = [..._publicRoutes, ..._privateRoutes, ..._globalRoutes];

  return <>{useRoutes(totalRootes)}</>;
};
