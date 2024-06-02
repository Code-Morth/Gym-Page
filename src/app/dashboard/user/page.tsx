import React from "react";
import ProtectedRoute from "../../../../components/protecte/ProtecteRouter";

import MainPage from "../../../../components/mains/MainPage";

const index = () => {
  return (
    <ProtectedRoute>
      <MainPage />
    </ProtectedRoute>
  );
};

export default index;
