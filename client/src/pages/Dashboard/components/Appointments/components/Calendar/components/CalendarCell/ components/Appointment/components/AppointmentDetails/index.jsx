import React from "react";
import { format } from "date-fns";
import c from "classnames";
import { Dialog, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppointmentActions } from "hooks/useAppointmentActions";
import RescheduleAppointment from "modules/appointments";
import { useToggle } from "react-use";

const colorScheme = {
  urgent: "bg-red-100",
  notUrgent: "bg-green-100",
  medium: "bg-yellow-100",
  text: {
    urgent: "text-red-500",
    notUrgent: "text-green-600",
    medium: "text-yellow-600",
  },
};

function AppointmentDetails(props) {
  const {
    requestedBy,
    description = "This is a mock appointment",
    priority = "medium",
    timestamp = Date.now(),
    time = Date.now(),
  } = props;
  const { toggle, update, ...rest } = props;
  const [openDialog, toggleDialog] = useToggle(false);
  const { deleteAppointment, updateAppointment, loading } =
    useAppointmentActions({ ...rest, update });
  const requestFrom = requestedBy.name;
  return (
    <div className="min-w-120">
      <div
        className={c(
          "p-4 w-full flex items-center justify-between",
          colorScheme[priority]
        )}
      >
        <p className={c("font-bold text-lg", colorScheme.text[priority])}>
          Appointment Details
        </p>
        <IconButton onClick={toggle}>
          <CloseRoundedIcon className={colorScheme.text[priority]} />
        </IconButton>
      </div>
      <div className="flex flex-col gap-y-2 p-3">
        <p className="text-base text-gray-600 my-4">{description}</p>
        <p className="text-base text-gray-600">
          <span>Created on : </span>
          <span>{format(time, "dd MMMM yyyy, h:mm aa")}</span>
        </p>
        <p className="text-base text-gray-600">
          <span>Time : </span>
          <span>{format(new Date(timestamp), "dd MMMM yyyy, h:mm aa")}</span>
        </p>
        <p className="text-base text-gray-600">
          <span>Created by : </span>
          <span>{requestFrom}</span>
        </p>
        <div className="w-full flex items-center justify-end gap-x-3 mt-4">
          <button
            className="p-1 px-2 bg-blue-100 text-blue-500 rounded font-bold"
            disabled={loading}
            onClick={toggleDialog}
          >
            Reschedule appointment
          </button>
          <button
            className="p-1 px-2 bg-red-100 text-red-500 rounded font-bold"
            disabled={loading}
            onClick={deleteAppointment}
          >
            Cancel appointment
          </button>
        </div>
      </div>
      <Dialog open={openDialog} onClose={toggleDialog}>
        <RescheduleAppointment updateAppointment={updateAppointment} />
      </Dialog>
    </div>
  );
}

export default React.memo(AppointmentDetails);
