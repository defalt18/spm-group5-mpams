import React from "react";
import c from "classnames";
import { format } from "date-fns";
import { useToggle } from "react-use";
import { Dialog } from "@mui/material";
import AppointmentDetails from "./components/AppointmentDetails";

const colorClass = {
  notUrgent: "bg-green-400",
  medium: "bg-yellow-300",
  urgent: "bg-red-500",
};

function Appointment(props) {
  const [open, toggle] = useToggle(false);
  const {
    requestedTo,
    requestedBy,
    priority = "notUrgent",
    confirmed = true,
    timestamp = Date.now(),
  } = props;
  const { toggleUpdate, ...rest } = props;
  const { name } = requestedBy;
  const {
    loggedInUser: { accountType },
  } = props;
  const { name: proName } = requestedTo.userInfo;

  if (!confirmed) return null;

  return (
    <>
      <button className="w-full flex items-center gap-x-2" onClick={toggle}>
        <span className="text-gray-600 text-sm">
          {format(new Date(timestamp), "h:mm aa")}
        </span>
        <span
          className={c(
            "text-white text-sm font-bold p-1 rounded px-2",
            colorClass[priority]
          )}
        >
          {accountType ? name : proName}
        </span>
      </button>
      <Dialog open={open} onClose={toggle}>
        <AppointmentDetails {...rest} toggle={toggle} update={toggleUpdate} />
      </Dialog>
    </>
  );
}

export default React.memo(Appointment);
