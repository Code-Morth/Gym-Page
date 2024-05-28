import React from "react";
import ProtectedRoute from "../../../../components/protecte/ProtecteRouter";

const index = () => {
  return (
    <ProtectedRoute>
      <div>
        <h2>soy el user</h2>
      </div>
      </ProtectedRoute>
   
  );
};

export default index;
