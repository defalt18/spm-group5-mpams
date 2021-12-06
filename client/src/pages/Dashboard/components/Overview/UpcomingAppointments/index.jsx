import React from "react";
import c from "classnames";
import Tooltip from "@mui/material/Tooltip";
import { default as RescheduleIcon } from "@mui/icons-material/ReplayOutlined";
import { default as CloseIcon } from "@mui/icons-material/CloseRounded";
import { format } from "date-fns";
import { default as DetailsIcon } from "@mui/icons-material/ReadMoreOutlined";
import { useUserContext } from "hooks/useUser";

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
        <button>
          <Tooltip title="Show details">
            <DetailsIcon
              className="bg-gray-100 rounded-2xl p-1"
              style={iconStyle}
            />
          </Tooltip>
        </button>
        <button>
          <Tooltip title="Reschedule appointment">
            <RescheduleIcon
              className="bg-gray-100 rounded-2xl p-1"
              style={iconStyle}
            />
          </Tooltip>
        </button>
        <button>
          <Tooltip title="Cancel appointment">
            <CloseIcon
              className="bg-gray-100 rounded-2xl p-1"
              style={iconStyle}
            />
          </Tooltip>
        </button>
      </div>
    </div>
  );
}

export default React.memo(UpcomingAppointment);
