import React from "react";
import { useDashboardData } from "./hooks";
import _size from "lodash/size";
import _map from "lodash/map";
import UpcomingAppointment from "./UpcomingAppointments";
import { default as ContentCard } from "./ContentCard";
import Loader from "components/Loader";
import _isEmpty from "lodash/isEmpty";
import { useToggle } from "react-use";

function Overview(props) {
  const { user } = props;
  const [update, updateComponent] = useToggle(false);

  const { loading, contacts, appointments } = useDashboardData({ user }, [
    update,
  ]);

  const content = user.accountType ? user.workspaceInfo : contacts;

  return (
    <div className="flex-1 grid place-items-center bg-gray-100 grid gap-12 grid-cols-2 grid-rows-2 p-8">
      <div className="shadow-xl bg-white h-full w-full rounded-2xl p-5 flex flex-col">
        <p className="text-lg font-bold">Welcome to MPAMS !</p>
        <p className="text-sm text-gray-500 mt-3">
          This is the overview of all the activity happening on your account.
          You can find upcoming appointments, contacts here to comb through.
          Enjoy and explore the portal to find out about all the other
          interesting stuff we put in!
        </p>
        <p className="text-sm text-gray-500 mt-auto">Brought to you by</p>
        <p className="font-bold">SPM Group 5</p>
      </div>
      <div className="shadow-xl bg-white h-full w-full overflow-scroll p-5 rounded-2xl relative">
        <p className="text-lg font-bold mb-3">Upcoming Appointments</p>
        {loading ? (
          <Loader
            className="absolute top-0 left-0 right-0 bottom-0"
            type="comp"
          />
        ) : (
          _map(appointments, (item, index) => (
            <UpcomingAppointment
              key={index}
              {...item}
              update={updateComponent}
            />
          ))
        )}
        {_isEmpty(appointments) && !loading && (
          <p className="w-full text-center">No items to show...</p>
        )}
      </div>
      <div className="shadow-xl bg-white h-full w-full overflow-scroll p-5 rounded-2xl relative">
        <p className="text-lg font-bold mb-3">
          {user.accountType ? (
            <>Workspace details ({_size(content)})</>
          ) : (
            <>Contacts ({_size(content)})</>
          )}
        </p>
        {loading ? (
          <Loader
            className="absolute top-0 left-0 right-0 bottom-0"
            type="comp"
          />
        ) : (
          _map(content, (item, index) => (
            <ContentCard
              key={index}
              content={item}
              type={user.accountType ? "PROFESSIONAL" : "USER"}
            />
          ))
        )}
        {_isEmpty(content) && !loading && (
          <p className="w-full text-center">No items to show...</p>
        )}
      </div>
      <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center mx-auto">
        <div>
          <p className="text-lg font-bold mb-3">Total appointments</p>
          <p className="text-8xl font-bold text-center">
            {_size(appointments)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Overview);
