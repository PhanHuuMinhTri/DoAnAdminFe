import { Spin } from "antd";
import React from "react";

import { SuspenseStyle } from "./Suspense.style";

const Suspense = () => {
  return (
    <SuspenseStyle>
      <Spin spinning={true} />
    </SuspenseStyle>
  );
};

export default Suspense;
