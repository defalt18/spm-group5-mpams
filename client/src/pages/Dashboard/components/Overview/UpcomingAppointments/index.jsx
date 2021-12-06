import React from "react";
import c from "classnames";
import Tooltip from "@mui/material/Tooltip";
import { default as RescheduleIcon } from "@mui/icons-material/ReplayOutlined";
import { default as CloseIcon } from "@mui/icons-material/CloseRounded";
import { format, isPast } from "date-fns";
import { useUserContext } from "hooks/useUser";
import { useAppointmentActions } from "hooks/useAppointmentActions";
import { Dialog } from "@mui/material";
import RescheduleAppointment from "modules/appointments";
import { useToggle } from "react-use";

const iconStyle = {
  height: 23,
  width: 23,
  color: "black",
};

const prioritySystem = {
  urgent: "bg-red-500",
  notUrgent: "bg-green-600",
  medium: "bg-yellow-600",
  text: {
    urgent: "Urgent",
    notUrgent: "Not urgent",
    medium: "Medium",
  },
};

function UpcomingAppointment(props) {
  const { user } = useUserContext();
  const [open, toggle] = useToggle(false);
  const { deleteAppointment, updateAppointment, loading } =
    useAppointmentActions(props);
  const { requestedTo, requestedBy, timestamp, priority } = props;
  const name = user.accountType
    ? requestedBy?.name
    : requestedTo?.userInfo?.name;

  return (
    <div
      className={c(
        "py-1.5 flex justify-between items-center border-b border-gray-300 w-full"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-x-2">
          <p className="text-black text-sm">{name}</p>
          <p
            className={c(
              "px-1 py-0.5 rounded text-white text-xs",
              prioritySystem[priority]
            )}
          >
            {prioritySystem.text[priority]}
          </p>
        </div>
        <p className="text-gray-400 text-xs">
          {format(new Date(timestamp), "h:ss aa , dd MMMM yyyy")}
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        {isPast(new Date(timestamp)) && (
          <p className="text-gray-700 bg-gray-200 rounded py-0.5 px-2 uppercase text-xs">
            Expired
          </p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <button onClick={toggle}>
              <Tooltip title="Reschedule appointment">
                <RescheduleIcon
                  className="bg-gray-100 rounded-2xl p-1"
                  style={iconStyle}
                />
              </Tooltip>
            </button>
            <button onClick={deleteAppointment}>
              <Tooltip title="Cancel appointment">
                <CloseIcon
                  className="bg-gray-100 rounded-2xl p-1"
                  style={iconStyle}
                />
              </Tooltip>
            </button>
          </>
        )}
      </div>
      <Dialog open={open} onClose={toggle}>
        <RescheduleAppointment
          {...props}
          updateAppointment={updateAppointment}
        />
      </Dialog>
    </div>
  );
}

export default React.memo(UpcomingAppointment);
