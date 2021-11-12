import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { UserContext } from "./context";
import App from "./App";
import useDefaultUser from "./hooks/useUser";

function MPAMS() {
  const contextValue = useDefaultUser();
  return (
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <UserContext.Provider value={contextValue}>
          <App />
        </UserContext.Provider>
      </Suspense>
    </React.StrictMode>
  );
}

export default MPAMS;
