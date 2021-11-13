import React, { useState } from "react";
import Page from "components/Page";
import { useUserContext } from "hooks/useUser";
import Sidebar from "./components/Sidebar";
import { VIEWS } from "./dashboard-model";
import Overview from "./components/Overview";
import Appointments from "./components/Appointments";
import People from "./components/People";

function Dashboard() {
  const contextValue = useUserContext();
  const { user } = contextValue;
  const [view, toggleView] = useState(VIEWS.Overview);

  if (!user) return null;

  const renderContent = () => {
    switch (view) {
      case VIEWS.Overview:
        return <Overview user={user} />;

      case VIEWS.Appointments:
        return <Appointments user={user} />;

      case VIEWS.People:
        return <People user={user} />;

      default:
        return null;
    }
  };

  return (
    <Page className="flex overflow-scroll">
      <Sidebar toggleView={toggleView} view={view} {...contextValue} />
      {renderContent()}
    </Page>
  );
}

export default Dashboard;
