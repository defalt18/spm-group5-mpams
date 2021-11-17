import React, { useState } from "react";
import { VIEWS } from "./views";
import Details from "./components/Details";
import Creator from "./components/Creator";
import Greetings from "./components/Greetings";

function ProfessionalDetails(props) {
  const [view, setView] = useState(VIEWS.Details);
  const renderContent = () => {
    switch (view) {
      case VIEWS.Details:
        return <Details {...props} setView={setView} />;

      case VIEWS.Creation:
        return <Creator {...props} setView={setView} />;

      case VIEWS.Greetings:
        return <Greetings toggle={props.toggle} />;

      default:
        return null;
    }
  };

  return <div className="min-w-120">{renderContent()}</div>;
}

export default React.memo(ProfessionalDetails);
