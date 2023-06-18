import React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { I18n } from "./configs/i18n/i18n";

import { RootRouter } from "./routers/Root";
import Suspense from "./components/suspense/Suspense";

import "./App.css";

const App = () => {
  return (
    <I18nextProvider i18n={I18n}>
      <BrowserRouter>
        <React.Suspense fallback={<Suspense />}>
          <RootRouter />
        </React.Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
