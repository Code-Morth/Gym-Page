

import ProtectedRoute from "../../../../components/protecte/ProtecteRouter";

import MainPage from "../../../../components/mains/MainPage";

export default function Admin() {
 

  return (
    <ProtectedRoute>
     <MainPage/>
    </ProtectedRoute>
  );
}
